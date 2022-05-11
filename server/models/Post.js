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
    isvalid: {type: Boolean, required: false},
    member_num: {type: Number, default: 1},
    member_min: {type: Number, default: 2},
    endtime: {type: String, required: true},
    chatroom: {type: mongoose.Schema.Types.ObjectId, ref: "Chatroom"}
},{
  //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
  timestamps: true
});
// userSchema.index({ email: 1, nickname: 1 });

const chatroomSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    message: {type: mongoose.Schema.Types.ObjectId, ref: "ChatroomMessage"}
});

const chatroomMessageSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    message_content: {type: String},
    username: {type: String}
    // username: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
    //데이터를 생성, 수정시 자동으로 시간을 기록해줌 
    timestamps: true
  });

const Post = mongoose.model('Post', postSchema)
const Chatroom = mongoose.model('Chatroom', chatroomSchema)
const ChatroomMessage = mongoose.model('ChatroomMessage', chatroomMessageSchema)

//스키마 등록 
module.exports = {Post, Chatroom, ChatroomMessage};