const router = require('express').Router();
const controller = require('../controllers');

// GET /items Router와 Controller를 연결합니다.

// 회원가입
router.post('/up', controller.sign.up);

// 회원가입시 이메일 중복체크
router.post('/emailcheck', controller.sign.emailCheck);

// 로그인
router.post('/in', controller.sign.in);

// 로그아웃
router.post('/out', controller.sign.out);

// 깃헙 로그인 or 회원가입 추가정보 받기전
router.get('/github/callback', controller.sign.github);

// 깃헙 추가정보 받은 후 회원가입 완료
router.post('/in/github', controller.sign.inGithub);

// 카카오 로그인 or 회원가입 추가정보 받기전
router.get('/kakao/callback', controller.sign.kakao);

// 카카오 추가정보 받은 후 회원가입 완료
router.post('/in/kakao', controller.sign.inKakao);

module.exports = router;