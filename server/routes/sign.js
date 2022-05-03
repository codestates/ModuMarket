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

// 카카오 로그인 or 회원가입 추가정보 받기전
router.get('/kakao/callback', controller.sign.kakao);

// 카카오 추가정보 받은 후 회원가입 완료
router.get('/kakao/sign', controller.sign.kakaoSign);

module.exports = router;