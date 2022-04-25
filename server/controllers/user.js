const User = require('../models/User');

module.exports = {
    mypage: async (req, res) => {
    //req에서 params에서 이메일받아서 아이디로 유저정보 가져오기
    // const { email } = accessTokenData ???

    //일단 가져왔다치고 밑의 이메일로 실험해보자 
    const userEmail = "aa@aa.aa"

      try {
        const result =  await User.findOne({ email: userEmail }).exec();
        const {name, email, age, area_name, user_image} = result
        console.log(result);
        res.status(200).json({data : name, email, age, area_name, user_image});
      } catch (err) {
        console.error(err);
      }
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
