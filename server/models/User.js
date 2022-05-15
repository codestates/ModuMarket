const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, trim: true },
    age: {type: Number, required: true},
    area_name: { type: String },
    user_image: { type: String, data: Buffer},
    social_Id: {type: Number},
},{

  //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
  timestamps: true
});
// userSchema.index({ email: 1, nickname: 1 });

//스키마 등록 
module.exports = mongoose.model('User', userSchema);
