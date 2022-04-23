const router = require('express').Router();
const controller = require('../controllers');

// 마이페이지 유저정보 가져오기
router.get('/', controller.user.get);

// 내가 작성한 공고글 목록
router.get('/:write_postId', controller.user.get);
router.get('/:attend_postId', controller.user.get);
router.post('/', controller.user.get);
router.patch('/', controller.user.get);
router.delete('/', controller.user.get);

module.exports = router;