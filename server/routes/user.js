const router = require('express').Router();
const controller = require('../controllers');

// 로그인 후 api주소와 동네주소 일치하는지 인증
router.post('location', controller.user.location);

// 마이페이지 유저정보 가져오기
router.get('/', controller.user.mypage);

// 내가 작성한 공고글 목록
router.get('/writepost', controller.user.writePost);

// 내가 참가한 공고글 목록
router.get('/participatepost', controller.user.participatePost);

// 마이페이지 정보수정(유저 비밀번호 인증(body에 password))
router.post('/', controller.user.auth);

// 사는곳 비밀번호 수정
router.patch('/', controller.user.changeInfo);

// 회원탈퇴
router.delete('/', controller.user.deleteInfo);

module.exports = router;