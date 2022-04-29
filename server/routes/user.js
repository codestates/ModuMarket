const router = require('express').Router();
const controller = require('../controllers');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}
  
const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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

// 이미지 등록
router.post('/:email/image', upload.single('img'), controller.user.uploadImage);

// 이미지 가져오기
router.get('/:email/image', controller.user.getImage)

// 회원탈퇴
router.delete('/', controller.user.deleteInfo);

module.exports = router;