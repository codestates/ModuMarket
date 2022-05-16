const router = require('express').Router();
const controller = require('../controllers');
const multer = require('multer');
const {getFileStream} = require('../s3');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: fileFilter})

// GET /items Router와 Controller를 연결합니다.
// 공고글 게시판 목록
router.get('/', controller.post.postList);

// 특정 공고글 보기(유저 로그아웃 상태)
router.get('/:id', controller.post.getPostOne);

// 특정 공고글 보기(유저 로그인 상태)
router.post('/:id', controller.post.postPostOne);

// 공고글 AWS s3에서 가져오기
router.get('/image/:key', (req, res) => {
    const key = req.params.key;

    const readStream = getFileStream(key)
    // console.log(readStream);

    readStream.pipe(res);
})

// 공고글 등록
router.post('/', upload.single('image'), controller.post.registerPost);

// 공고글 수정
// formdata에 이미지가 있는데 이미지를 못받으니까 body에 아무것도 안 들어옴.
router.patch('/', upload.single('newImage'), controller.post.modifyPost);

// 공고글에 있는 참가 신청 버튼
router.patch('/:id/apply', controller.post.applyPost);

// 공고글에 있는 참가 취소 버튼
router.patch('/:id/cancel', controller.post.cancelApplyPost);

// 공고글 삭제
router.delete('/:id', controller.post.deletePost);

module.exports = router;
