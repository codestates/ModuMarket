const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    category: { type: Number, required: true },
    area_name: {type: String, required: true},
    title: {type: String, required: true},
    post_content: {type: String, required: true},
    image: { type: String, data: Buffer },
    post_location: {type: String, required: true},
    isvalid: {type: Boolean, required: true},
    member_num: {type: Number, required: true},
    endtime: {type: Date, required: true},
    chatroom: new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        message: new mongoose.Schema({
            id: mongoose.Schema.Types.ObjectId,
            message_content: {type: String},
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            createdAt: {type: Date, default: Date.now()}
        })
    })
},{
  //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
  timestamps: true
});
// userSchema.index({ email: 1, nickname: 1 });

//스키마 등록 
module.exports = mongoose.model('Post', postSchema);

