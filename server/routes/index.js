const express = require('express');
const router = express.Router();
const postRouter = require('./post');
const userRouter = require('./user');
const signRouter = require('./sign');

// TODO: Endpoint에 따라 적절한 Router로 연결해야 합니다.
router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/sign', signRouter);

module.exports = router;
