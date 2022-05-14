const User = require('../models/User');
const { Post } = require('../models/Post');
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');
const { uploadFile, deleteFile } = require('../s3');
const { up } = require('./sign');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

module.exports = {

  postList: async (req, res) => {
    // Post.deleteMany({}).exec();
    console.log(req.body);
    if (req.headers.authorization === 'Bearer') {
      await Post.updateMany({ endtime: { $lt: Date.now() } }, { isvalid: true })
      const result = await Post.find({})
      res.status(200).json({ data: result });
    } else if (req.headers.authorization && req.cookies.refreshToken) {
      const token = req.headers.authorization.split(' ')[1];
      const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
      const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
      // 토큰있는지 확인해서 없으면 다 보여주고
      // 토큰 있으면 토큰안에 있는 area_name으로 필터링해서 보여주기 
      if (accTokenData && refTokenData) {
        const { area_name } = accTokenData;
        await Post.updateMany({ endtime: { $lt: Date.now() } }, { isvalid: true })
        const result = await Post.find({ area_name })
        res.status(200).json({ data: result });
      }
      if (!accTokenData && refTokenData) {
        const { email } = refTokenData;
        const userResult = await User.findOne({ email }).exec();
        if (refTokenData) {
          const { _id, email, area_name } = userResult
          const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });
          await Post.updateMany({ endtime: { $lt: Date.now() } }, { isvalid: true })
          const result = await Post.find({ area_name })
          res.status(200).json({ data: { result, accessToken } });
        }
      }
      if (accTokenData && !refTokenData) {
        const { email } = accTokenData;
        const userResult = await User.findOne({ email }).exec();
        if (accTokenData) {
          const { _id, email, area_name } = userResult
          const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });
          await Post.updateMany({ endtime: { $lt: Date.now() } }, { isvalid: true })
          const result = await Post.find({ area_name })
          res.status(200)
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .json({ data: result });
        }
      }
    }

  },

  postPostOne: async (req, res) => {
   
    const {_id} = req.body;
    console.log(req.body);
    let a = await Application.findOne({user_id: _id, post_id: req.params.id}).exec();
    console.log(a);
    
    if (a === null) {
      let newApplication = new Application();
      newApplication.post_id = req.params.id
      newApplication.user_id = _id
      newApplication.isapplied = false
      newApplication.save();
    }
    

    if (req.headers.authorization === 'Bearer') {
      const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
      res.status(200).json({ data: result ,  isapplied: false});
    }else if (req.headers.authorization && req.cookies.refreshToken) {
      const token = req.headers.authorization.split(' ')[1];
      const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
      const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
      if (accTokenData && refTokenData) {
        const { _id } = accTokenData;
        const applied = await Application.find({post_id: req.params.id, user_id:_id}).select('isapplied')
        console.log(applied);
        if (applied.length !== 0) {
          if(applied[0].isapplied === false){ // 참가이력이 없거나, 참가했다가 취소한 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200).json({ data: result ,  isapplied: false});
          } else { //참가이력이 있는 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200).json({ data: result ,  isapplied: true});
          }
        } else {
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200).json({ data: result  , message : "안녕"});
        }
      }
      if (!accTokenData && refTokenData) {
        const { _id } = refTokenData;
        const userResult = await User.findOne({ _id }).exec();
        if(refTokenData){
          const { _id, email, area_name } = userResult
            const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });
            const applied = await Application.findOne({post_id: req.params.id, user_id:_id}).select('isapplied')
            if(!applied.isapplied){ // 참가이력이 없거나, 참가했다가 취소한 경우 
              const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
              res.status(200).json({ data: result ,  isapplied: false, accessToken});
            } else { //참가이력이 있는 경우 
              const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
              res.status(200).json({ data: result ,  isapplied: true, accessToken});
            }
        }
        
      }
      if (accTokenData && !refTokenData) {
        const { _id } = accTokenData;
        const userResult = await User.findOne({ _id }).exec();
        if(accTokenData){
          const { _id, email, area_name } = userResult
          const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });
          const applied = await Application.find({post_id: req.params.id, user_id:_id}).select('isapplied')
          if(!applied.isapplied){ // 참가이력이 없거나, 참가했다가 취소한 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200)
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .json({ data: result ,  isapplied: false});
          } else { //참가이력이 있는 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200)
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .json({ data: result ,  isapplied: true});
          }
        }
      }
    }

  },

  getPostOne: async (req, res) => {
   

    if (req.headers.authorization === 'Bearer') {
      const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
      res.status(200).json({ data: result ,  isapplied: false});
    }else if (req.headers.authorization && req.cookies.refreshToken) {
      const token = req.headers.authorization.split(' ')[1];
      const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
      const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
      if (accTokenData && refTokenData) {
        const { _id } = accTokenData;
        const applied = await Application.find({post_id: req.params.id, user_id:_id}).select('isapplied')
        console.log(applied);
        if (applied.length !== 0) {
          if(applied[0].isapplied === false){ // 참가이력이 없거나, 참가했다가 취소한 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200).json({ data: result ,  isapplied: false});
          } else { //참가이력이 있는 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200).json({ data: result ,  isapplied: true});
          }
        } else {
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200).json({ data: result});
        }
      }
      if (!accTokenData && refTokenData) {
        const { _id } = refTokenData;
        const userResult = await User.findOne({ _id }).exec();
        if(refTokenData){
          const { _id, email, area_name } = userResult
            const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });
            const applied = await Application.findOne({post_id: req.params.id, user_id:_id}).select('isapplied')
            if(!applied.isapplied){ // 참가이력이 없거나, 참가했다가 취소한 경우 
              const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
              res.status(200).json({ data: result ,  isapplied: false, accessToken});
            } else { //참가이력이 있는 경우 
              const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
              res.status(200).json({ data: result ,  isapplied: true, accessToken});
            }
        }
        
      }
      if (accTokenData && !refTokenData) {
        const { _id } = accTokenData;
        const userResult = await User.findOne({ _id }).exec();
        if(accTokenData){
          const { _id, email, area_name } = userResult
          const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });
          const applied = await Application.find({post_id: req.params.id, user_id:_id}).select('isapplied')
          if(!applied.isapplied){ // 참가이력이 없거나, 참가했다가 취소한 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200)
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .json({ data: result ,  isapplied: false});
          } else { //참가이력이 있는 경우 
            const result = await Post.findOne({ _id: req.params.id }).populate('userId', 'name').exec()
            res.status(200)
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .json({ data: result ,  isapplied: true});
          }
        }
      }
    }

  },

  registerPost: async (req, res) => {
    // if (req.headers.authorization) {
    // }
    // console.log(req.file)
    const token = req.headers.authorization.split(' ')[1];
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    //console.log(refTokenData);

    if (refTokenData) {
      console.log(req.body.endtime)
      // console.log(req.file)
      const newPost = new Post();
      if (req.file) {
        await uploadFile(req.file);
        // console.log(await uploadFile(req.file))
        await unlinkFile(req.file.path)
        newPost.image = req.file.filename;
      }
      newPost.userId = req.body.userId;
      newPost.category = req.body.category;
      newPost.area_name = req.body.area_name;
      newPost.title = req.body.title;
      newPost.member_min = req.body.member_min;
      newPost.post_content = req.body.post_content;
      newPost.post_location = req.body.post_location;
      newPost.isvalid = req.body.isvalid;
      newPost.endtime = req.body.endtime;

      newPost.save()
        .then(() => {
          console.log('성공')
          res.status(201).json({ message: "게시글이 생성되었습니다" });
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (!accTokenData && refTokenData) {
      const emaildata = refTokenData.email
      const result = await User.findOne({ email: emaildata }).exec();
      const { _id, email, area_name } = result
      const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });

      const newPost = new Post();
      newPost.userId = req.body.userId;
      newPost.category = req.body.category;
      newPost.area_name = req.body.area_name;
      newPost.title = req.body.title;
      newPost.member_min = req.body.member_min;
      newPost.post_content = req.body.post_content;
      newPost.image = req.file.filename;
      newPost.post_location = req.body.post_location;
      newPost.isvalid = req.body.isvalid;
      newPost.endtime = req.body.endtime;

      newPost.save()
        .then(() => {
          console.log('성공')
          res.status(201).json({ data: { accessToken }, message: "게시글이 생성되었습니다" });
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (accTokenData && !refTokenData) {
      const emaildata = accTokenData.email
      const result = await User.findOne({ email: emaildata }).exec();
      const { _id, email, area_name } = result
      const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });

      const newPost = new Post();
      newPost.userId = req.body.userId;
      newPost.category = req.body.category;
      newPost.area_name = req.body.area_name;
      newPost.title = req.body.title;
      newPost.member_min = req.body.member_min;
      newPost.post_content = req.body.post_content;
      newPost.image = req.file.filename;
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
            .status(201).json({ message: "게시글이 생성되었습니다" });
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  },

  modifyPost: async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const token = req.headers.authorization.split(' ')[1];
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);

    if (accTokenData && refTokenData) {
      const { _id, category, area_name, title, isvalid, member_min, post_content,
        formerImage, post_location, endtime } = req.body
      if (isvalid === false) {
        await Post.findByIdAndUpdate(_id, { $set: { isvalid: false } })
        res.status(204).json({ message: "모집이 완료되었습니다" });
      } else {
        if (req.file) {
          await uploadFile(req.file);
          await deleteFile(formerImage);
          // console.log(await uploadFile(req.file))
          await unlinkFile(req.file.path);
          await Post.findByIdAndUpdate(_id, {
            $set: {
              category, area_name, title, member_min, post_content,
              image: req.file.filename, post_location, endtime
            }
          },
            { new: true }).exec()   
        } else {
          await Post.findByIdAndUpdate(_id, {
            $set: {
              category, area_name, title, member_min, post_content,
              post_location, endtime
            }
          },
            { new: true }).exec()
        }
  
        
        res.status(200).json({ message: "게시글이 수정되었습니다" });
      }
    }
    if (!accTokenData && refTokenData) {
      const { emaildata } = refTokenData
      const result = await User.findOne({ email: emaildata }).exec();
      const { _id, email, area_name } = result
      const accTokenData = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });
      if (refTokenData) {
        const { _id, category, area_name, title, isvalid, member_min, post_content,
          image, post_location, endtime } = req.body
        if (isvalid === false) {
          await Post.findByIdAndUpdate(_id, { $set: { isvalid: false } })
          res.status(200).json({ data: { accTokenData }, message: "모집이 완료되었습니다" });
        } else {
          await Post.findByIdAndUpdate(_id, {
            $set: {
              category, area_name, title, member_min, post_content,
              image, post_location, endtime
            }
          },
            { new: true }).exec()
          res.status(200).json({ data: { data: null, accTokenData }, message: "게시글이 수정되었습니다" });
        }
      }
    }
    if (accTokenData && !refTokenData) {
      const { emaildata } = accTokenData
      const result = await User.findOne({ email: emaildata }).exec();
      const { _id, email, area_name } = result
      const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });

      if (accTokenData) {
        const { _id, category, area_name, title, isvalid, member_min, post_content,
          image, post_location, endtime } = req.body
        if (isvalid === false) {
          await Post.findByIdAndUpdate(_id, { $set: { isvalid: false } })
          res.status(200)
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .json({ message: "모집이 완료되었습니다" });
        } else {
          await Post.findByIdAndUpdate(_id, {
            $set: {
              category, area_name, title, member_min, post_content,
              image, post_location, endtime
            }
          },
            { new: true }).exec()
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(200).json({ message: "게시글이 수정되었습니다" });
        }
      }
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }

  },

  applyPost: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    //토큰에서 유저아이디 겟 하기 .. 
    // const { _id } = accessTokenData 
    // req.params.id는 포스트컬렉션의 id
    // application 컬렉션에서 포스트_id, ueser_id 일치하는 도큐먼트를 찾았을때
    // isapplied가 false 이거나 값이 생성되지않은 상태일때에만 member_num이 추가되어야한다. 
    
    if (accTokenData && refTokenData) {
      console.log(req.params)
      const { _id } = accTokenData

      const applicationCollection = await Application.findOne({ post_id: req.params.id, user_id: _id }).exec();
      // console.log(applicationCollection);
      if (!applicationCollection) { // 참여한적이 없는 상태로 Application 도큐먼트를 생성
        await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: 1 } },
          { new: true }).exec()

        res.status(200).json({ data: null, message: "참여 신청이 완료되었습니다" });
      } else {
        if (applicationCollection.isapplied === true) { //이미 참여이므로 참여하기 눌러도 소용없게 . 
          res.status(200).json({ data: null, message: "이미 참여중입니다" });
        }
        else if (applicationCollection.isapplied === false) { //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: 1 } },
            { new: true }).exec()
  
          await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          }, { isapplied: true })
          res.status(200).json({ data: null, message: "참여 신청이 완료되었습니다" });
        }
      }
    }
    if (!accTokenData && refTokenData) {
      const { _id } = refTokenData
      const result = await User.findOne({ _id: _id }).exec();
      if (refTokenData) {
        const { _id, email, area_name } = result
        const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });

        const applicationCollection = await Application.findOne({ post_id: req.params.id, user_id: _id }).exec()
        if (applicationCollection.isapplied === true) { //이미 참여이므로 참여하기 눌러도 소용없게 . 
          res.status(404).json({ data: { accessToken }, message: "이미 참여중입니다" });
        }
        else if (applicationCollection.isapplied === false) { //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: 1 } },
            { new: true }).exec()

          await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          }, { isapplied: true })
          res.status(200).json({ data: { accessToken }, message: "참여 신청이 완료되었습니다" });
        }
        else { // 참여한적이 없는 상태로 Application 도큐먼트를 생성
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: 1 } },
            { new: true }).exec()

          const newApplication = new Application();
          newApplication.post_id = req.params.id
          newApplication.user_id = _id

          newApplication.save()
            .then(() => {
              console.log('성공')
              res.status(200).json({ data: { accessToken }, message: "참여 신청이 완료되었습니다" });
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
    if (accTokenData && !refTokenData) {
      const { _id } = accTokenData
      const result = await User.findOne({ _id: _id }).exec();
      if (accTokenData) {
        const { _id, email, area_name } = result
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });

        const applicationCollection = await Application.findOne({ post_id: req.params.id, user_id: _id }).exec()
        if (applicationCollection.isapplied === true) { //이미 참여이므로 참여하기 눌러도 소용없게 . 
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(404).json({ data: null, message: "이미 참여중입니다" });
        }
        else if (applicationCollection.isapplied === false) { //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: 1 } },
            { new: true }).exec()

          await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          }, { isapplied: true })
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(200).json({ data: null, message: "참여 신청이 완료되었습니다" });
        }
        else { // 참여한적이 없는 상태로 Application 도큐먼트를 생성
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: 1 } },
            { new: true }).exec()

          const newApplication = new Application();
          newApplication.post_id = req.params.id
          newApplication.user_id = _id
          newApplication.save()
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(200).json({ data: null, message: "참여 신청이 완료되었습니다" });
        }
      }
    }
    if (!accTokenData && !refTokenData) {
      return res.status(401).json({ data: null, message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  },

  cancelApplyPost: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const accTokenData = jwt.verify(token, process.env.ACCESS_SECRET);
    const refTokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
    //토큰 확인하고 .. 
    // req.params.id는 포스트컬렉션의 id
    // application 컬렉션에 포스트_id, ueser_id 일치하는 도큐먼트를 찾았을때
    // isapplied가 true 일때만 member_num이 마이너스 되어야한다. 

    if (accTokenData && refTokenData) {
      const { _id } = accTokenData
      const applicationCollection = await Application.findOne({ post_id: req.params.id, user_id: _id }).exec()
      if (applicationCollection.isapplied === false) { //이미 취소상태이므로 취소하기 눌러도 소용없게 . 
        res.status(404).json({ data: null, message: "이미 취소하셨습니다" });
      }
      else if (applicationCollection.isapplied === true) { //참여취소한상태이므로 다시 참여하기상태로 변경
        await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: -1 } },
          { new: true }).exec()

        const applicationResult = await Application.findOneAndUpdate({
          post_id: req.params.id,
          user_id: _id
        }, { isapplied: false })
        res.status(200).json({ data: null, message: "참여 취소가 완료되었습니다" });
      }
    }
    if (!accTokenData && refTokenData) {
      const { _id } = refTokenData
      const result = await User.findOne({ _id: _id }).exec();
      if (refTokenData) {
        const { _id, email, area_name } = result
        const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });

        const applicationCollection = await Application.findOne({ post_id: req.params.id, user_id: _id }).exec()
        if (applicationCollection.isapplied === false) { //이미 취소상태이므로 취소하기 눌러도 소용없게 . 
          res.status(404).json({ data: null, message: "이미 취소하셨습니다" });
        }
        else if (applicationCollection.isapplied === true) { //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: -1 } },
            { new: true }).exec()

          const applicationResult = await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          }, { isapplied: false })
          res.status(200).json({ data: { accessToken }, message: "참여 취소가 완료되었습니다" });
        }
      }
    }
    if (accTokenData && !refTokenData) {
      const { _id } = accTokenData
      const result = await User.findOne({ _id: _id }).exec();
      if (accTokenData) {
        const { _id, email, area_name } = result
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });

        const applicationCollection = await Application.findOne({ post_id: req.params.id, user_id: _id }).exec()
        if (applicationCollection.isapplied === false) { //이미 취소상태이므로 취소하기 눌러도 소용없게 . 
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(404).json({ data: null, message: "이미 취소하셨습니다" });
        }
        else if (applicationCollection.isapplied === true) { //참여취소한상태이므로 다시 참여하기상태로 변경
          await Post.findByIdAndUpdate(req.params.id, { $inc: { member_num: -1 } },
            { new: true }).exec()

          await Application.findOneAndUpdate({
            post_id: req.params.id,
            user_id: _id
          }, { isapplied: false })
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(200).json({ data: null, message: "참여 취소가 완료되었습니다" });
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

    if (accTokenData && refTokenData) {
      const { _id } = accTokenData

      const result = await Post.deleteOne({ _id: req.params.id, userId: accTokenData._id })
      if (result.deletedCount === 1) {
        res.status(200).json({ data: null, message: "공고글이 삭제되었습니다" });
      } else {
        res.status(404).json({ data: null, message: "잘못된 요청입니다" });
      }
    }
    else if (!accTokenData && refTokenData) {
      const { _id } = refTokenData
      const result = await User.findOne({ _id: _id }).exec();
      if (refTokenData) {
        const { _id, email, area_name } = result
        const accessToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.ACCESS_SECRET, { expiresIn: '2h' });

        const result = await Post.deleteOne({ _id: req.params.id, userId: accTokenData._id })
        if (result.deletedCount === 1) {
          res.status(200).json({ data: { accessToken }, message: "공고글이 삭제되었습니다" });
        } else {
          res.status(404).json({ data: null, message: "잘못된 요청입니다" });
        }
      }
    }
    else if (accTokenData && !refTokenData) {
      const { _id } = accTokenData
      const userResult = await User.findOne({ _id: _id }).exec();
      if (accTokenData) {
        const { _id, email, area_name } = userResult
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify({ _id, email, area_name })), process.env.REFRESH_SECRET, { expiresIn: '14d' });

        const result = await Post.deleteOne({ _id: req.params.id, userId: accTokenData._id })
        if (result.deletedCount === 1) {
          res
            .cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 14, // 쿠키 유효시간: 14일
              httpOnly: true,
            })
            .status(200).json({ data: null, message: "공고글이 삭제되었습니다" });
        } else {
          res.status(404).json({ data: null, message: "잘못된 요청입니다" });
        }
      }
    }
    else if (!accTokenData && !refTokenData) {
      return res.status(401).json({ message: "인증되지 않았습니다. 로그인이 필요합니다" })
    }
  }
}
