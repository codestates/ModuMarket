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

const { Post, Chatroom, ChatroomMessage } = require('./models/Post');


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

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
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
// } else {
//   // express가 http를 통해 실행될 수 있도록 만들기
//   server = http.createServer(app).listen(PORT, () => {
//     console.log(`Express http server is listening on port ${PORT}`)
//   })

  // 위에서 만들어둔 listen이란 변수에 서버를 담고 CORS 처리하기.
  // io 객체를 통해 메시지를 전달하고 받음.
  const io = listen(server, {
    cors: {
      origin: "*",
      credentials: true,
    }
  });

  io.on('connection', socket=>{
    console.log("connection 서버 연결이 완료되었습니다."+socket.id)

    socket.on('type', (room) => {
      socket.join(room, () => {
        console.log(room + `에 입장하셨습니다다.`);
      }); 
      
      //let arr = []; //메시지들 출력하는거 
      ChatroomMessage.find({roomId:room})
      // .populate('chatroom')
      .exec((err, data) => {
        //console.log(data);
        if (data.length === 0) {
          return;
        } else {
          console.log(data)
          const result = data.map(el => {
            return {
              username: el.username, 
              message_content: el.message_content,
              time: el.time
            }
          })
          console.log(result)
          //const time = moment(new Date()).format("h:mm A") //?
          io.to(room).emit('type', {result, room}) // arr= 채팅내역, 요 채팅방에만 메시지를 보내겠다
        }
      });
    })
    
    socket.on('message', async ({name, message, room}) => {
      console.log(name, message, room)
      const time = moment(new Date()).format("h:mm A")
      
      const chatroomMessage = new ChatroomMessage();
      chatroomMessage.roomId = room
      chatroomMessage.message_content = message
      chatroomMessage.username = name
      chatroomMessage.time = time

      chatroomMessage.save();
      io.to(room).emit('message',({name, message, time, room}))

    });

    socket.on('leave', (room) => {
      socket.leave(room, ()=>{
        console.log('왜안되냐 ... ')
      });
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    })

  })
  

}