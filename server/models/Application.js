const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    isapplied: {type: [Number], required: true}
},{
  //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
  timestamps: true
});
// userSchema.index({ email: 1, nickname: 1 });

//스키마 등록 
module.exports = mongoose.model('Application', applicationSchema);

