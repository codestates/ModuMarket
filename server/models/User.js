const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: Number, required: true, trim: true },
    age: {type: Number, required: true},
    user_location: {type: [Number], required: true}
},{
  //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
  timestamps: true
});
// userSchema.index({ email: 1, nickname: 1 });

//스키마 등록 
module.exports = mongoose.model('User', userSchema);




