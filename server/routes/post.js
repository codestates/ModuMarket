const router = require('express').Router();
const controller = require('../controllers');

// GET /items Router와 Controller를 연결합니다.
// 공고글 게시판 목록
router.get('/', controller.post.postList);

// 특정 공고글 보기
router.get('/:id', controller.post.postOne);

// 공고글 등록
router.post('/', controller.post.registerPost);

// 공고글 수정
router.patch('/:id', controller.post.modifyPost);

// 공고글에 있는 참가 신청 버튼
router.patch('/:id/apply', controller.post.applyPost);

// 공고글에 있는 참가 취소 버튼
router.patch('/:id/cancle', controller.post.cancleApplyPost);

// 공고글 삭제
router.delete('/:id', controller.post.deletePost);

module.exports = router;
