const User = require('../models/User');
const Post = require('../models/Post');
const Application = require('../models/Application');

module.exports = {
  postList: async(req, res) => {
      const result = await Post.find({})
      res.status(200).json({data : result});
  },

  postOne: async (req, res) => {
    const result = await Post.findOne({_id : req.params.id})
    res.status(200).json({data : result});
  },

  registerPost: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET); 
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);

    if (accTokenData && refTokenData) {
      const newPost = new Post();
      newPost.userId = req.body.userId;
      newPost.category = req.body.category;
      newPost.area_name = req.body.area_name;
      newPost.title = req.body.title;
      newPost.post_content = req.body.post_content;
      newPost.image = req.body.image;
      newPost.post_location = req.body.post_location;
      newPost.isvalid = req.body.isvalid;
      newPost.endtime = req.body.endtime;
  
      newPost.save()
      .then(() => {
        console.log('성공')
        res.status(201).json({data : null, message: "게시글이 생성되었습니다"});
      })
      .catch((err) => { 
        console.log(err)
      })
    }
    if (!accTokenData && refTokenData) {
      const { emaildata } = refTokenData
      const result =  await User.findOne({ email: emaildata }).exec();
      const {_id, name, email, age, area_name, user_location, user_image} = result
      const accessToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
      
      const newPost = new Post();
      newPost.userId = req.body.userId;
      newPost.category = req.body.category;
      newPost.area_name = req.body.area_name;
      newPost.title = req.body.title;
      newPost.post_content = req.body.post_content;
      newPost.image = req.body.image;
      newPost.post_location = req.body.post_location;
      newPost.isvalid = req.body.isvalid;
      newPost.endtime = req.body.endtime;
  
      newPost.save()
      .then(() => {
        console.log('성공')
        res.status(201).json({data : {accessToken}, message: "게시글이 생성되었습니다"});
      })
      .catch((err) => { 
        console.log(err)
      })
    }
    if (accTokenData && !refTokenData) {
      const { emaildata } = accTokenData
      const result =  await User.findOne({ email: emaildata }).exec();
      const {_id, name, email, age, area_name, user_location, user_image} = result
      const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
      
      await User.findByIdAndUpdate(_id, {refreshToken})

      const newPost = new Post();
      newPost.userId = req.body.userId;
      newPost.category = req.body.category;
      newPost.area_name = req.body.area_name;
      newPost.title = req.body.title;
      newPost.post_content = req.body.post_content;
      newPost.image = req.body.image;
      newPost.post_location = req.body.post_location;
      newPost.isvalid = req.body.isvalid;
      newPost.endtime = req.body.endtime;
  
      newPost.save()
      .then(() => {
        console.log('성공')
        res
        .cookie("refreshToken", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
          httpOnly: true,
        })
        .status(201).json({data : null, message: "게시글이 생성되었습니다"});
      })
      .catch((err) => { 
        console.log(err)
      })
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ data: null, message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  },

  modifyPost: async(req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET); 
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);

    if (accTokenData && refTokenData) {
      const {_id, category, area_name, title, post_content, 
        image, post_location, isvalid, endtime} = req.body
      const result = await Post.findOneAndUpdate({_id, category, area_name, title, post_content, 
        image, post_location, isvalid, endtime},  
        {new: true}).exec()
        res.status(200).json({data : result, message: "게시글이 수정되었습니다"});
    }
    if (!accTokenData && refTokenData) {
      const { emaildata } = refTokenData
      const result =  await User.findOne({ email: emaildata }).exec();
      const {_id, name, email, age, area_name, user_location, user_image} = result
      const accTokenData = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
      if(refTokenData){
        const {_id, category, area_name, title, post_content, 
          image, post_location, isvalid, endtime} = req.body
        const result = await Post.findOneAndUpdate({_id, category, area_name, title, post_content, 
          image, post_location, isvalid, endtime},  
          {new: true}).exec()
          res.status(200).json({data : {data: result, accTokenData}, message: "게시글이 수정되었습니다"});
      }
    }
    if (accTokenData && !refTokenData) {
      const { emaildata } = accTokenData
      const result =  await User.findOne({ email: emaildata }).exec();
      const {_id, name, email, age, area_name, user_location, user_image} = result
      const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
      
      await User.findByIdAndUpdate(_id, {refreshToken})

      if(accTokenData){
        const {_id, category, area_name, title, post_content, 
          image, post_location, isvalid, endtime} = req.body
        const result = await Post.findOneAndUpdate({_id, category, area_name, title, post_content, 
          image, post_location, isvalid, endtime},  
          {new: true}).exec()
          res
          .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
            httpOnly: true,
          })
          .status(200).json({data : result, message: "게시글이 수정되었습니다"});
      }
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ data: null, message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }

  },
  applyPost: async(req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET); 
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    //토큰에서 유저아이디 겟 하기 .. 
    // const { _id } = accessTokenData 
    // req.params.id는 포스트컬렉션의 id
    // application 컬렉션에서 포스트_id, ueser_id 일치하는 도큐먼트를 찾았을때
    // isapplied가 false 이거나 값이 생성되지않은 상태일때에만 member_num이 추가되어야한다. 
    if (accTokenData && refTokenData) {
      const { _id } = accTokenData 
      const applicationCollection = await Application.findOne({post_id:req.params.id, user_id:_id}).exec()
      if(applicationCollection.isapplied === true){ //이미 참여이므로 참여하기 눌러도 소용없게 . 
        res.status(404).json({data : null, message: "이미 참여중입니다"});
      } 
      else if(applicationCollection.isapplied === false){ //참여취소한상태이므로 다시 참여하기상태로 변경
        await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: 1}}, 
          {new: true}).exec()
  
        const applicationResult = await Application.findOneAndUpdate({
          post_id: req.params.id,
          user_id: _id
        },{isapplied : true})
      res.status(200).json({data : null, message: "참여 신청이 완료되었습니다"});
      } 
      else { // 참여한적이 없는 상태로 Application 도큐먼트를 생성
        await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: 1}}, 
          {new: true}).exec()
  
        const newApplication = new Application();
        newApplication.post_id = req.params.id
        newApplication.user_id = _id
        res.status(200).json({data : null, message: "참여 신청이 완료되었습니다"});
      }
    }
    if (!accTokenData && refTokenData) {
      const { _id } = refTokenData 
      const result =  await User.findOne({ _id: _id }).exec();
      if(refTokenData){
        const {_id, name, email, age, area_name, user_location, user_image} = result
        const accessToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
      
        const applicationCollection = await Application.findOne({post_id:req.params.id, user_id:_id}).exec()
        if(applicationCollection.isapplied === true){ //이미 참여이므로 참여하기 눌러도 소용없게 . 
          res.status(404).json({data : {accessToken}, message: "이미 참여중입니다"});
        } 
        else if(applicationCollection.isapplied === false){ //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: 1}}, 
            {new: true}).exec()
    
          const applicationResult = await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          },{isapplied : true})
        res.status(200).json({data : {accessToken}, message: "참여 신청이 완료되었습니다"});
        } 
        else { // 참여한적이 없는 상태로 Application 도큐먼트를 생성
          await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: 1}}, 
            {new: true}).exec()
    
          const newApplication = new Application();
          newApplication.post_id = req.params.id
          newApplication.user_id = _id
          res.status(200).json({data : {accessToken}, message: "참여 신청이 완료되었습니다"});
        }
      }
    }
    if (accTokenData && !refTokenData) {
      const { _id } = accTokenData 
      const result =  await User.findOne({ _id: _id }).exec();
      if(accTokenData){
        const {_id, name, email, age, area_name, user_location, user_image} = result
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
        
        await User.findByIdAndUpdate(_id, {refreshToken})
      
        const applicationCollection = await Application.findOne({post_id:req.params.id, user_id:_id}).exec()
        if(applicationCollection.isapplied === true){ //이미 참여이므로 참여하기 눌러도 소용없게 . 
          res
          .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
            httpOnly: true,
          })
          .status(404).json({data : null, message: "이미 참여중입니다"});
        } 
        else if(applicationCollection.isapplied === false){ //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: 1}}, 
            {new: true}).exec()
    
          const applicationResult = await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          },{isapplied : true})
        res
        .cookie("refreshToken", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
          httpOnly: true,
        })
        .status(200).json({data : null, message: "참여 신청이 완료되었습니다"});
        } 
        else { // 참여한적이 없는 상태로 Application 도큐먼트를 생성
          await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: 1}}, 
            {new: true}).exec()
    
          const newApplication = new Application();
          newApplication.post_id = req.params.id
          newApplication.user_id = _id
          res
          .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
            httpOnly: true,
          })
          .status(200).json({data : null, message: "참여 신청이 완료되었습니다"});
        }
      }
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ data: null, message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  }, 

  cancleApplyPost: async(req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET); 
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    //토큰 확인하고 .. 
    // req.params.id는 포스트컬렉션의 id
    // application 컬렉션에 포스트_id, ueser_id 일치하는 도큐먼트를 찾았을때
    // isapplied가 true 일때만 member_num이 마이너스 되어야한다. 

    if (accTokenData && refTokenData) {
      const { _id } = accTokenData 
      const applicationCollection = await Application.findOne({post_id:req.params.id, user_id:_id}).exec()
      if(applicationCollection.isapplied === false){ //이미 취소상태이므로 취소하기 눌러도 소용없게 . 
        res.status(404).json({data : null, message: "이미 취소하셨습니다"});
      } 
      else if(applicationCollection.isapplied === true){ //참여취소한상태이므로 다시 참여하기상태로 변경
        await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: -1}}, 
          {new: true}).exec()
  
        const applicationResult = await Application.findOneAndUpdate({
          post_id: req.params.id,
          user_id: _id
        },{isapplied : false})
      res.status(200).json({data : null, message: "참여 취소가 완료되었습니다"});
      } 
    }
    if (!accTokenData && refTokenData) {
      const { _id } = refTokenData 
      const result =  await User.findOne({ _id: _id }).exec();
      if(refTokenData){
        const {_id, name, email, age, area_name, user_location, user_image} = result
        const accessToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
      
        const applicationCollection = await Application.findOne({post_id:req.params.id, user_id:_id}).exec()
        if(applicationCollection.isapplied === false){ //이미 취소상태이므로 취소하기 눌러도 소용없게 . 
          res.status(404).json({data : null, message: "이미 취소하셨습니다"});
        } 
        else if(applicationCollection.isapplied === true){ //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: -1}}, 
            {new: true}).exec()
    
          const applicationResult = await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          },{isapplied : false})
        res.status(200).json({data : null, message: "참여 취소가 완료되었습니다"});
        } 
      }
    }
    if (accTokenData && !refTokenData) {
      const { _id } = accTokenData 
      const result =  await User.findOne({ _id: _id }).exec();
      if(accTokenData){
        const {_id, name, email, age, area_name, user_location, user_image} = result
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
        
        await User.findByIdAndUpdate(_id, {refreshToken})
      
        const applicationCollection = await Application.findOne({post_id:req.params.id, user_id:_id}).exec()
        if(applicationCollection.isapplied === false){ //이미 취소상태이므로 취소하기 눌러도 소용없게 . 
          res
          .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
            httpOnly: true,
          })
          .status(404).json({data : null, message: "이미 취소하셨습니다"});
        } 
        else if(applicationCollection.isapplied === true){ //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, {$inc: {member_num: -1}}, 
            {new: true}).exec()
    
          const applicationResult = await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          },{isapplied : false})
        res
        .cookie("refreshToken", refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
          httpOnly: true,
        })
        .status(200).json({data : null, message: "참여 취소가 완료되었습니다"});
        } 
      }
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ data: null, message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  },

  deletePost: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET); 
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);

    const result = await Post.deleteOne({_id : req.params.id, userId: accTokenData._id})
    if(result.deletedCount === 1){
      res.status(200).json({data : null, message: "공고글이 삭제되었습니다"});
    }else {
      res.status(404).json({data : null, message: "잘못된 요청입니다"});
    }

    if (accTokenData && refTokenData) {
      // const { _id } = accTokenData 
      const result = await Post.deleteOne({_id : req.params.id, userId: accTokenData._id})
      if(result.deletedCount === 1){
        res.status(200).json({data : null, message: "공고글이 삭제되었습니다"});
      }else {
        res.status(404).json({data : null, message: "잘못된 요청입니다"});
      }
    }
    if (!accTokenData && refTokenData) {
      const { _id } = refTokenData 
      const result =  await User.findOne({ _id: _id }).exec();
      if(refTokenData){
        const {_id, name, email, age, area_name, user_location, user_image} = result
        const accessToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
        
        const result = await Post.deleteOne({_id : req.params.id, userId: accTokenData._id})
        if(result.deletedCount === 1){
          res.status(200).json({data : {accessToken}, message: "공고글이 삭제되었습니다"});
        }else {
          res.status(404).json({data : null, message: "잘못된 요청입니다"});
        }
      }
    }
    if (accTokenData && !refTokenData) {
      const { _id } = accTokenData 
      const result =  await User.findOne({ _id: _id }).exec();
      if(accTokenData){
        const {_id, name, email, age, area_name, user_location, user_image} = result
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({_id, name, email, age, area_name, user_location, user_image})), process.env.ACCESS_SECRET);
        
        await User.findByIdAndUpdate(_id, {refreshToken})
        
        const result = await Post.deleteOne({_id : req.params.id, userId: accTokenData._id})
        if(result.deletedCount === 1){
          res
          .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
            httpOnly: true,
          })
          .status(200).json({data : null, message: "공고글이 삭제되었습니다"});
        }else {
          res.status(404).json({data : null, message: "잘못된 요청입니다"});
        }
      }
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ data: null, message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  }
}

