const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const axios = require('axios')
const { v4 } = require('uuid');

module.exports = {
  up: async (req, res) => {

    let { name, email, password, age, area_name } = req.body;

    // 빈값이 오면 팅겨내기
    if (!name || !email || !password || !age) {
      if (!name) {
        return res.status(400).json({ message: "이름 정보가 빠졌습니다" });
      } else if (!email) {
        return res.status(400).json({ message: "이메일 정보가 빠졌습니다" });
      } else if (!password) {
        return res.status(400).json({ message: "비밀번호 정보가 빠졌습니다" });
      } else if (!age) {
        return res.status(400).json({ message: "나이 정보가 빠졌습니다" });
      } else {
        return res.status(400).json({ message: "입력정보를 다시 확인해주세요" });
      }
    }

    // // 비밀번호가 같지 않으면 팅겨내기
    // if (password !== passwordCheck) return res.json({message: "비밀번호가 같지 않습니다"});

    // 솔트 생성 및 해쉬화 진행
    bcrypt.genSalt(saltRounds, (err, salt) => {
      // 솔트 생성 실패시
      if (err)
        return res.status(500).json({ message: "비밀번호가 안전하지 않습니다." });
      // salt 생성에 성공시 hash 진행

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res.status(500).json({ message: "비밀번호가 안전하지 않습니다." });

        // 비밀번호를 해쉬된 값으로 대체합니다.
        password = hash;

        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.age = age;
        newUser.area_name = area_name;
        newUser.password = password;


        // console.log(User)
        newUser.save()
          .then(() => {
            return res.status(201).json({ message: '회원가입이 완료되었습니다' });
          })
          .catch((err) => {
            throw new Error(err)
          })
      });
    });
  },

  emailCheck: async (req, res) => {
    let { email } = req.body;
    const sameEmailUser = await User.findOne({ email: email });
    if (sameEmailUser) {
      return res.json({ message: "이미 존재하는 이메일입니다" });
    } else {
      return res.json({ message: "사용가능한 이메일입니다" });
    }
  },

  in: (req, res) => {
    // 로그인할때 이메일, 비밀번호로 회원인지 조회하기 
    // 일단 이메일로 조회 
    User.findOne({ email: req.body.email }, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "서버 오류" });
      }
      // 이메일 일치할 경우 비밀번호 확인하기
      if (data) {
        const checkPW = () => {
          //복호화 
          bcrypt.compare(req.body.password, data.password, (err, isMatch) => {
            if (err) {
              return res.status(500).json({ message: "서버 오류" });
            }
            // 비밀번호가 일치할 경우 
            if (isMatch) {
              // 비밀번호가 맞으면 token을 생성해야함
              const { _id, email, area_name, name } = data;
              // acessToken 생성 2h 유효
              const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })),
                process.env.ACCESS_SECRET, { expiresIn: '2h' });
              // refreshToken 생성 14d 유효
              const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })),
                process.env.REFRESH_SECRET, { expiresIn: '14d' });

              res
                .cookie("refreshToken", refreshToken, {
                  maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
                  httpOnly: true,
                })
                .status(200)
                .json({ data: { id: _id, name: name, area_name: area_name, accessToken: accessToken }, message: "로그인에 성공하였습니다." });
            }


            else {
              return res.status(401).json({ message: "비밀번호를 확인해주세요" });
            }
          });
        };
        checkPW();
      }
      // 이메일이 일치하지않을 경우 
      else {
        return res.status(404).json({ message: "이메일을 확인해주세요" });
      }
    })

  },

  out: async (req, res) => {
    res
      .cookie('refreshToken', null, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 0 })
      .send({ message: "로그아웃이 완료되었습니다." })
    // .redirect('/')
  },

  kakao: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (data) => {
        const { email } = data.data.kakao_account
        const id = data.data.id

        // 카카오에서 유저정보를 받아왔으면 카카오 유니크 키로, 가입했는지 여부 확인
        const result = await User.findOne({ social_Id: id }).exec()
        if (result) { // 가입한 유저이면? 디비에 있는 유저의 동네정보, 아이디, 이메일을 갖고 토큰만들어서주기
          const { _id, email, name, area_name } = result;
          const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })),
            process.env.ACCESS_SECRET, { expiresIn: '2h' });
          // refreshToken 생성 14d 유효
          const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })),
            process.env.REFRESH_SECRET, { expiresIn: '14d' });
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(201)
            .json({ id: _id, name: name, area_name: area_name, accessToken: accessToken, message: "로그인에 성공하였습니다." });

        } else { //가입안한 유저이면 추가정보 받는 경로로 아이디, 이메일 보내주기 .. 
          return res.status(200).json({ id, email });
        }
      })
  },

  inKakao: async (req, res) => {
    // req.body에 유저정보 (카카오고유 아이디, 이메일, 이름, 나이 , 동네주소)가 있을 것임
    let { id, email, name, age, area_name } = req.body;

    const newUser = new User();
    newUser.social_Id = id;
    newUser.name = name;
    newUser.email = email;
    newUser.age = age;
    newUser.area_name = area_name;

    // console.log(User)
    newUser.save()
      .then(() => {
        return res.status(201).json({ message: '회원가입이 완료되었습니다' });
      })
      .catch((err) => {
        throw new Error(err)
      })
  },

  github: async (req, res) => {
    let githubAccessToken = '';
    const CODE = req.query.code;
    let id = '';
    let email = '';

    //uuid로 난수생성
    const uuid = () => {
      const tokens = v4().split('-')
      return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
    }

    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_GITHUB_APP_KEY}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}&code=${CODE}`,
      headers: {
        accept: 'application/json',
      },
    })
      .then((data) => {
        githubAccessToken = data.data.access_token;
        // console.log(githubAccessToken)
        axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${githubAccessToken}`,
          },
        })
          .then(async (data) => { //토큰으로 유저정보 받아오기 
            if (!data.data.email) {
              // github유저가 private email로 설정해둘 경우 
              // null 값인 email을 무작위의 uuid 값을 자체 github email로 따로 부여
              let randomNum = uuid();
              email = randomNum + '@github.com'
            } else {
              email = data.data.email;
            }
            id = data.data.id;
            // ! social_github : id 가 들어가도록 해야함
            const result = await User.findOne({ social_Id: id }).exec()
            if (result) { // 가입한 유저이면? 디비에 있는 유저의 동네정보, 아이디, 이메일을 갖고 토큰만들어서주기
              const { _id, email, name, area_name } = result;
              const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })),
                process.env.ACCESS_SECRET, { expiresIn: '2h' });
              // refreshToken 생성 14d 유효
              const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })),
                process.env.REFRESH_SECRET, { expiresIn: '14d' });
              res
                .cookie("refreshToken", refreshToken, {
                  maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
                  httpOnly: true,
                  secure: true
                })
                .cookie("githubAccessToken", githubAccessToken, {
                  maxAge: 1000 * 60 * 60 * 2, // 쿠키 유효시간: 2시간
                  httpOnly: true,
                })
                .status(201)
                .json({ id: _id, name: name, area_name: area_name, accessToken: accessToken, message: "로그인에 성공하였습니다." });

            } else { //가입안한 유저이면 추가정보 받는 경로로 아이디, 이메일 보내주기 .. 
              return res.status(200).json({ id, email });
            }
          })
      })
  },

  inGithub: async (req, res) => {
    let { id, email, name, age, area_name } = req.body;

    const newUser = new User();
    newUser.social_Id = id;
    newUser.name = name;
    newUser.email = email;
    newUser.age = age;
    newUser.area_name = area_name;

    // console.log(User)
    newUser.save()
      .then(() => {
        return res.status(201).json({ message: '회원가입이 완료되었습니다' });
      })
      .catch((err) => {
        throw new Error(err)
      })

  },

  outGithub: async (req, res) => {

    const access_token = req.cookies.githubAccessToken

    await axios.delete(`https://api.github.com/applications/${process.env.REACT_APP_GITHUB_APP_KEY}/grant`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json"
        },
        auth: {
          username: process.env.REACT_APP_GITHUB_APP_KEY,
          password: process.env.REACT_APP_GITHUB_SECRET
        },
        data: {
          access_token
        }
      }
    )
      .then(() => {
        res.status(200).json({ message: '로그아웃이 완료되었습니다' });
      })
  }


}