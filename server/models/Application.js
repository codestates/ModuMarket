const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // 참가하는 공고글인지 여부 
    isapplied: {type: Boolean, default: true}
},{
  //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
  timestamps: true
});

//스키마 등록 
module.exports = mongoose.model('Application', applicationSchema);

