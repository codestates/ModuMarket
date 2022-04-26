const router = require('express').Router();
const controller = require('../controllers');

// GET /items Router와 Controller를 연결합니다.

// 회원가입
router.post('/up', controller.sign.up);

// 로그인
router.post('/in', controller.sign.in);

// 로그아웃
router.post('/out', controller.sign.out);

// // Github 소셜 로그인(회원가입?)
// router.get('/in/github', controller.user.get);

// // Facebook 소셜 로그인(회원가입?)
// router.get('/in/facebook', controller.user.get);

// // (서버) Github callback
// router.get('/in/github/callback', controller.user.get);

// // (서버) Facebook callback
// router.get('/in/facebook/callback', controller.user.get);

module.exports = router;