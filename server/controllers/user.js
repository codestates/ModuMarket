const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    mypage: async (req, res) => {
    // console.log(req.cookies)
    // console.log(req.headers)
    // accessToken으로 유저정보 가져오기  || accessToken이 만료돼고 refreshToken
    if (!req.headers.authorization) {
      return res.status(401).send({data: null, message: 'invalid access token'})
    }

    if (!req.cookies.refreshToken) {
      return res.status(401).send({data: null, message: 'refresh token not provided'})
    }
    // const { email } = accessTokenData ???
    
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    //일단 가져왔다치고 밑의 이메일로 실험해보자
    const accToken = jwt.verify(token, process.env.ACCESS_SECRET); // 토큰을 해독해 유저 데이터를 리턴
    const refToken = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    console.log(accToken);
    console.log(refToken)
    // 만약 서버에서 생성한 유효한 토큰이면
  
    if (!accToken) {
      if (!refToken) {
          res.status(404).send({ "data": null, "message": "access and refresh token has been tempered" })
      } else {
        const userinfo = await User.findOne({ email: refToken.email }).exec();
      
        delete userinfo.password;
    
        const accessToken = jwt.sign(userinfo, process.env.ACCESS_SECRET);
    
        return res.send({data: {accessToken: accessToken, userInfo: userinfo}, message: "ok"})
      }
    } else {
      if (!refToken) {
        const userinfo = await User.findOne({ email: accToken.email }).exec();

        const {_id, name, email, age, area_name, user_location, user_image} = userinfo

        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.REFRESH_SECRET, {expiresIn: '14d'});

        userinfo.refreshToken = refreshToken;

        res.cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .send({data: {userinfo: {_id, name, email, age, area_name, user_location, user_image}}})
      } else {
        const userinfo = await User.findOne({ email: accToken.email }).exec();

        const {_id, name, email, age, area_name, user_location, user_image} = userinfo
  
        res.status(200).send({data: {userInfo: {_id, name, email, age, area_name, user_location, user_image}}, message: 'ok'})
      }
    }
    //   res.status(404).send({ "data": null, "message": "access token has been tempered" })
    // } else {
    //   const userinfo = await User.findOne({ email: data.email }).exec();

    //   // console.log(userinfo);
    //   delete userinfo.password;
  
    //   res.status(200).send({data: {userInfo: userinfo}, message: 'ok'})
    // }

    // const userEmail = "aa@aa.aa"

      // try {
      //   const result =  await User.findOne({ email: userEmail }).exec();
      //   const {name, email, age, area_name, user_image} = result
      //   console.log(result);
      //   res.status(200).json({data : {name, email, age, area_name, user_image}});
      // } catch (err) {
      //   console.error(err);
      // }
    },

    auth: async (req, res) => { // 바디에 패스워드가 온다고한다 .. 
        // const { email } = accessTokenData ??? ??
        //바디에서 패스워드를 가져와서 , 토큰에 들어있는 이메일에 있는 패스워드인지 확인 ! 
        const userEmail = "aa@aa.aa"
        console.log(req.body.password)
        try {
            const result =  await User.findOne({ email: userEmail }).exec();
           
            if(result.password === req.body.password) {
                res.status(200).json({data : null, message: '인증이 완료되었습니다'});
            } else {
                res.status(404).json({data : null, message: '비밀번호가 일치하지않습니다'});
            }
          } catch (err) {
            console.error(err);
            // res.status(501).json({data : null, message: 'server error'});
          }

        // res.send('a')
    },

    changeInfo: (req, res) => {
      // 사는곳 수정은 인증으로 대체 .. 
        res.send('b')
    },

    deleteInfo: async (req, res) => {
        // 토큰확인후 .. 이메일 얻어서 
        const userEmail = "aseagga@ab.aassstpt"
        const result = await User.deleteOne({email : userEmail})
        if(result.deletedCount === 1){
            res.status(200).json({data : null, message: '회원탈퇴가 완료 되었습니다'});
        } else {
            res.status(404).json({data : null, message: '잘못된 요청입니다'});
        }
    }
};
