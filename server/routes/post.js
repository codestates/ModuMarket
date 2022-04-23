const router = require('express').Router();
const controller = require('../controllers');

// GET /items Router와 Controller를 연결합니다.
// 공고글 게시판 목록
router.get('/', controller.post.get);

// 특정 공고글 보기
router.get('/:id', controller.post.get);

// 공고글 등록
router.post('/', controller.post.get);

// 공고글 수정
router.patch('/:id', controller.post.get);

// 참가 신청
router.patch('/:id', controller.post.get);

// 참가 취소
router.patch('/:id', controller.post.get);

// 공고글 삭제
router.delete('/:id', controller.post.get);

module.exports = router;
