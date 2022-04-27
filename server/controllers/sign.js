const User = require('../models/User');
const bcrypt = require("bcrypt"); 
const jwt = require('jsonwebtoken');
const saltRounds = 10;  

module.exports = {
  up: async (req, res) => {

    let {name, email, password, age, user_location} = req.body;

    // 빈값이 오면 팅겨내기
    if (!name || !email || !password || !age || !user_location) {
      return res.json({message: "빠진 정보가 있습니다"});
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

  in:  (req, res) => {
    // 로그인할때 이메일, 비밀번호로 회원인지 조회하기 
    // 일단 이메일로 조회 
    User.findOne({email: req.body.email},(err, data) => {
      if(err) {
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
              const {_id, name, email, age, area_name, user_location, user_image} = data;
              // acessToken 생성 2h 유효
              const accessToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), 
                                  process.env.ACCESS_SECRET, {expiresIn: '2h'});
              // refreshToken 생성 14d 유효
              const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), 
                                  process.env.REFRESH_SECRET, {expiresIn: '14d'});

              // 해당 유저정보에 refreshToken값 저장
              data.refreshToken = refreshToken; 
              data.save((err, data) => {
                if (err) {
                  return res.status(500).json({ message: "서버 오류" });
                }
  
                // DB에 token 저장한 후에는 cookie에 토큰을 저장하여 이용자를 식별합니다.
                return res
                  .cookie("refreshToken", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
                    httpOnly: true,
                  })
                  .status(200)
                  .json({ data: {accessToken: accessToken}, message: "로그인에 성공하였습니다."});
              });
            } 
            else {
              return res.status(403).json({message: "비밀번호를 확인해주세요"});
            }
          });
        };
        checkPW();
      } 
      // 이메일이 일치하지않을 경우 
      else {
        return res.status(404).json({message: "이메일을 확인해주세요"});
      }
    })
   
  },

  out: async (req, res) => {
    // 리프레시 토큰을 null로 주고 accessToken도 비워준다.

    // delete user.refreshToken; // null값으로 수정
    const result = await User.updateOne({email: req.body.email},{$set: {refreshToken: null}})
    res
    .cookie('refreshToken',null,{ httpOnly: true})
    .send({accessToken: null, message: "로그아웃이 완료되었습니다."})
  },
}