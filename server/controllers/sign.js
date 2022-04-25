const User = require('../models/User');

module.exports = {
  up: (req, res) => {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.age = req.body.age;
    newUser.user_location = req.body.user_location;
    
    newUser.save()
    .then(() => {
      console.log('성공')
    })
    .catch((err) => { //프론트에서 타입을 다 맞게 보내준다면, 이메일 중복을 여기서 잡아낼 수 있음
      console.log(err)
    })

    res.send("up");
  },

  in: (req, res) => {
    // 로그인할때 이메일, 비밀번호로 회원인지 조회하기 
    User.find({email: req.body.email},(err, data) => {
      if(err) {
        console.log('err !!!!')
        res.end();
      }
      if(data[0]){ // 아이디가 일치할때
        if(data[0].password === req.body.password){ //비밀번호 확인
          console.log("로그인성공")
        }else {
          console.log("비밀번호 확인해주세요")
        }
      }else { // 아이디가 일치하지않을때
        console.log('아이디를 확인해주세요')
      }
    })
    res.send("in");
  },

  out: (req, res) => {
    res.send("out");
  },
}