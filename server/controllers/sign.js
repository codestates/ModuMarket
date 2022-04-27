const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = {
  up: async (req, res) => {

    let {name, email, password, age, user_location} = req.body;

    // 빈값이 오면 팅겨내기
    if (!name || !email || !password || !age || !user_location) {
      return res.json({message: "정보를 입력하세요"});
    }

    // // 비밀번호가 같지 않으면 팅겨내기
    // if (password !== passwordCheck) return res.json({message: "비밀번호가 같지 않습니다"});

    // 이메일 검증
    const sameEmailUser = await User.findOne({ email: email });
    if (sameEmailUser !== null) {
      return res.json({message: "이미 존재하는 이메일입니다"});
    }
    
      // 솔트 생성 및 해쉬화 진행
    bcrypt.genSalt(saltRounds, (err, salt) => {
      // 솔트 생성 실패시
      if (err)
        return res.status(500).json({message: "비밀번호가 안전하지 않습니다."});
      // salt 생성에 성공시 hash 진행

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err)
          return res.status(500).json({message: "비밀번호가 안전하지 않습니다."});

        // 비밀번호를 해쉬된 값으로 대체합니다.
        password = hash;

        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.age = age;
        newUser.user_location = user_location;
      
        // console.log(User)
        newUser.save()
        .then(() => {
          return res.status(201).json({data: newUser._id, message: '회원가입이 완료되었습니다'});
        })
        .catch((err) => { //프론트에서 타입을 다 맞게 보내준다면, 이메일 중복을 여기서 잡아낼 수 있음
          throw new Error(err)
        })
      });
    });
  },

  in: async (req, res) => {
    // 로그인할때 이메일, 비밀번호로 회원인지 조회하기 
    // console.log(User.find({}, {
    //   $set: age
    // }))
    User.findOne({email: req.body.email},(err, data) => {
      console.log(data)
      if(err) {
        console.log('err !!!!')
        return res.status(500).json({ error: "서버 오류" });
      }

      if (!data) {
        return res.status(404).json({message: "회원을 찾을 수 없습니다."});
      }

      // console.log(req.body.password)
      // console.log(data.password)
      if (data) {
        const checkPW = () => {
          bcrypt.compare(req.body.password, data.password, async (error, isMatch) => {
            // console.log(error)
            // console.log(isMatch)
            if (error) {
              return res.status(500).json({ error: error });
            }
            if (isMatch) {
              // 비밀번호가 맞으면 token을 생성해야 합니다.
              // secret 토큰 값은 특정 유저를 감별하는데 사용합니다.
              // console.log(data);
              // delete data.password
              // console.log(data);

              // acessToken 생성 30s 유효
              const accessToken = jwt.sign(JSON.parse(JSON.stringify(data)), process.env.ACCESS_SECRET, {expiresIn: '2h'});
              // refreshToken 생성 2h 유효
              const refreshToken = jwt.sign(JSON.parse(JSON.stringify(data)), process.env.REFRESH_SECRET, {expiresIn: '14d'});

              // 해당 유저에게 token값 할당 후 저장
              
              await User.updateOne({email: data.email}, {
                $set: {refreshToken: null}
              })
              data.refreshToken = refreshToken;
              // console.log(data[0])
              data.save((error, data) => {
                if (error) {
                  return res.status(500).json({ error: "something wrong" });
                }
  
                // DB에 token 저장한 후에는 cookie에 토큰을 저장하여 이용자를 식별합니다.
                return res
                  .cookie("refreshToken", data.refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
                    httpOnly: true,
                  })
                  .status(200)
                  .json({ data: {accessToken: accessToken}, message: "로그인에 성공하였습니다."});
              });
            } else {
              return res.status(403).json({message: "이메일이나 비밀번호가 틀립니다."});
            }
          });
        };
        checkPW();
      }
    })
  },

  out: async (req, res) => {
    // 리프레시 토큰을 null로 주고 accessToken도 비워준다.
    // console.log(req.body.email)
    await User.updateOne({email: req.body.email}, {
      $set: {refreshToken: null}
    })

    res.cookie('refreshToken', null,{ httpOnly: true}).send({accessToken: null, message: "로그아웃이 완료되었습니다."})
  },
}