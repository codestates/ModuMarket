const User = require('../models/User');
const Post = require('../models/Post');
const Application = require('../models/Application');

module.exports = {
  postList: async(req, res) => {
      const result = await Post.find({})
      res.status(200).json({data : result});
  },

  postOne: async (req, res) => {
    //토큰 확인하고 .. 

    const result = await Post.findOne({_id : req.params.id})
    res.status(200).json({data : result});
  },

  registerPost: (req, res) => {
    //토큰 확인하고 .. 
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
  },

  modifyPost: async(req, res) => {
    //토큰 확인 후 .. 
    const {_id, category, area_name, title, post_content, 
      image, post_location, isvalid, endtime} = req.body
    const result = await Post.findOneAndUpdate({_id, category, area_name, title, post_content, 
      image, post_location, isvalid, endtime},  
      {new: true}).exec()

      //업데이트된 정보 result
      res.status(200).json({data : result, message: "게시글이 수정되었습니다"});
  },
  applyPost: async(req, res) => {
    //토큰에서 유저아이디 겟 하기 .. 
    // const { _id } = accessTokenData 
    // const _id =
    // req.params.id는 포스트컬렉션의 id
    // application 컬렉션에서 포스트_id, ueser_id 일치하는 도큐먼트를 찾았을때
    // isapplied가 false 이거나 값이 생성되지않은 상태일때에만 member_num이 추가되어야한다. 

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
  }, 

  cancleApplyPost: async(req, res) => {
    //토큰 확인하고 .. 
    // req.params.id는 포스트컬렉션의 id
    // application 컬렉션에 포스트_id, ueser_id 일치하는 도큐먼트를 찾았을때
    // isapplied가 true 일때만 member_num이 마이너스 되어야한다. 

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
  },

  deletePost: async (req, res) => {
    //토큰 확인 후 .. 
    const result = await Post.deleteOne({_id : req.params.id})
    if(result.deletedCount === 1){
      res.status(200).json({data : null, message: "공고글이 삭제되었습니다"});
    }else {
      res.status(404).json({data : null, message: "잘못된 요청입니다"});
    }
  }
}

