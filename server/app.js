const express = require('express');
const indexRouter = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const PORT = 4000;
const db = require('./db/index');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const listen = require('socket.io');
const moment = require('moment')
const {Post, Chatroom, ChatroomMessage} = require('./models/Post');

  let arr = [];

  Chatroom.find({roomname: "채팅방1"}).populate('message', ['message_content', 'username']).exec((err, data) => {
    console.log(data)
    if (data.length === 0) {
      return;
    } else if (data[0].message.username && data[0].message.message_content) {
      data.forEach(el => {
        arr.push({
          username: el.message.username, 
          message_content: el.message.message_content
        })
      })
    }
    console.log(arr);
  })  

app.use(
  morgan('      :method :url :status :res[content-length] - :response-time ms')
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'))
app.use(cors({
  origin: true,
  credentials: true,
  method: ['get', 'post', 'options', 'delete']
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', indexRouter);
db();

let server;

if (!fs.existsSync("./key.pem") && !fs.existsSync("./cert.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app
    )
    .listen(PORT, () => {
      console.log(`Express https server is listening on port ${PORT}`)
    });
} else {
  // express가 http를 통해 실행될 수 있도록 만들기
  server = http.createServer(app).listen(PORT, () => {
    console.log(`Express http server is listening on port ${PORT}`)
  })

  // 위에서 만들어둔 listen이란 변수에 서버를 담고 CORS 처리하기.
  // io 객체를 통해 메시지를 전달하고 받음.
  const io = listen(server, {
    cors : {
      origin: "*",
      credentials: true,
    }
  });
  
  // 클라이언트에서 접속 요쳥이 오면 connection event 발생
  io.on('connection', socket=>{
    console.log("연결이 완료되었습니다.")

    socket.on('type', (room) => {
      socket.join(room); // 채팅방 생성 
      console.log(room + '에 입장하셨습니다.');
      // socket.emit("EVENT", data) => 이벤트 발생(개별 소켓)
      // socket.io.emit("Broadcast Event", [data]) => 연결된 모든 소켓에 이벤트 발생(io.emit 가능)
      const time = moment(new Date()).format("h:mm A")
      io.to(room).emit('type', {arr, time, room}) // arr= 채팅내역,  요 채팅방에만 메시지를 보내겠다 
    })
    
    socket.on('message', async ({name, to, chatname, message, room}) => {

      const chatroomMessage = new ChatroomMessage({
        message_content: message,
        username: name
      });
      chatroomMessage.save((err, data) => {
        // console.log(data)
      });

      const chatroom = new Chatroom({
        roomname: room,
        message: chatroomMessage._id
      });
      chatroom.save((err, data) => {

      });
        
      socket.join(room);
      console.log(room + '에 입장하셨습니다.');
      // socket.emit("EVENT", data) => 이벤트 발생(개별 소켓)
      // socket.io.emit("Broadcast Event", [data]) => 연결된 모든 소켓에 이벤트 발생(io.emit 가능)
      const time = moment(new Date()).format("h:mm A")
      io.to(room).emit('message',({name, message, time, room}))
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  })
}