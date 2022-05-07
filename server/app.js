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

  const deleteChatroom = async () => {
    await Chatroom.deleteMany({roomname: '채팅방1'})
  }

  deleteChatroom();

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

// newPost.save()
// .then((data) => {
//   console.log(data);
// }).catch((err) => {
//   // console.log(err)
// })
// const a = Post.findOne({member_min: 1 }).then(data => console.log(data));
// console.log(a)
// console.log(newPost);

app.use(
  morgan('      :method :url :status :res[content-length] - :response-time ms')
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static('images'))
app.use(cors({
  origin: true,
  credentials: true,
  method: ['get', 'post', 'options', 'delete']
}));
app.use(express.urlencoded({ extended: true }));
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
} else {
  // express가 http를 통해 실행될 수 있도록 만들기
  server = http.createServer(app).listen(PORT, () => {
    console.log(`Express http server is listening on port ${PORT}`)
  })
  // server = http.createServer(app)

  // 위에서 만들어둔 listen이란 변수에 서버를 담고 CORS 처리하기.
  // io 객체를 통해 메시지를 전달하고 받음.
  const io = listen(server, {
    cors : {
      origin: "*",
      credentials: true,
    }
  });
  // console.log(io)

  let users = [];

  const messages = {
    general: [],
    random: [],
    jokes: [],
    javascript: []
  }
  
  // 클라이언트에서 접속 요쳥이 오면 connection event 발생
  io.on('connection', socket=>{
    // socket: connection이 성공했을 때 커넥션에 대한 정보를 담고 있는 변수(객체)(req 객체랑 유사)
    console.log("연결이 완료되었습니다.")
    // socket.on('message',({name,message}) => {
      //     // socket.emit("EVENT", data) => 이벤트 발생(개별 소켓)
      //     // socket.io.emit("Broadcast Event", [data]) => 연결된 모든 소켓에 이벤트 발생(io.emit 가능)
      //     const time = moment(new Date()).format("h:mm A")
      //     io.emit('message',({name, message, time}))
      // });
      // socket.on('join_room', (room) => {
        //   console.log(room + '에 입장하셨습니다.')
        
        // })
        
        socket.on('join server', (username) => {
          const user = {
            username,
            // 클라이언트마다 다름
            id: socket.id
      }
      
      users.push(user);
      io.emit('new user', users);
    })
    
    socket.on('join room', (roomName, cb) => {
      socket.join(roomName);
      cb(messages[roomName])
    })

    socket.on('type', (room) => {
      socket.join(room);
      console.log(room + '에 입장하셨습니다.');
      // socket.emit("EVENT", data) => 이벤트 발생(개별 소켓)
      // socket.io.emit("Broadcast Event", [data]) => 연결된 모든 소켓에 이벤트 발생(io.emit 가능)
      const time = moment(new Date()).format("h:mm A")
      io.to(room).emit('type', {arr, time, room})
    })
    
    socket.on('message', async ({name, to, chatname, message, room}) => {
      
      // const chatt = await Chatroom.findOne({roomname: "채팅방1"});
      // console.log(result);
      // console.log(chatt);
      
      // Post.findOne({member_min: 5 }).populate("chatroom").exec((err, data) => {
        //   console.log(data);
      // })

      // Post, Chatroom, ChatroomMessage collection 존재
      // 위 3개 collection이 join 관계가 형성되어야 함.
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
        // console.log(data);
      });

      // Post.findOne({_id: "6274d9a41732665ada382b12"}).exec((err, data) => {
      //   // console.log(data);
      // })

      // function getChatroomConnection() {
      //   const newChatroom = new Chatroom();
      //   return newChatroom;
      // }
      
      // // 모델 뼈대만 존재
      // const getChatroom = getChatroomConnection();
      // // console.log(getChatroom)
      
      // let chatMessage  =  new ChatroomMessage({ message_content: message, username: name});
      // // save 실행만 시켜주면 됨.
      // chatMessage.save((err, data1) => {
      //   Post.findOne({member_min: 5}).populate("chatroom").exec((err, data) => {
      //     data.chatroom = getChatroom._id
      //     data.save().then(() => {
      //       getChatroom.roomname = room;
      //       getChatroom.message = data1._id
      //       // console.log(getChatroom);
      //       getChatroom.save()
      //       .then(() => {
      //         Chatroom.findOne({roomname: "채팅방2"}).populate('message').exec((err, data) => {
      //           // console.log(data);
      //         });
      //       })
      //     });
      //     // console.log(data);
      //   });
      //   // console.log(data1);
      // });
      
      // Post.findOne({member_min: 5 }).populate("chatroom").exec((err, data) => {
        //   console.log(data);
        // })
        
        // const result = await Post.findOne({name: name});
        
      socket.join(room);
      console.log(room + '에 입장하셨습니다.');
      // socket.emit("EVENT", data) => 이벤트 발생(개별 소켓)
      // socket.io.emit("Broadcast Event", [data]) => 연결된 모든 소켓에 이벤트 발생(io.emit 가능)
      const time = moment(new Date()).format("h:mm A")
      io.to(room).emit('message',({name, message, time, room}))
      // io.to(to).emit('message',({name, message, time}))

      // if (messages[chatname]) {
      //   messages[chatname].push({
      //     name,
      //     message
      //   })
      // }
    });

    socket.on('disconnect', () => {
      // users = users.filter(u => u.id != socket.id);
      // io.emit('new user', users);
      console.log('user disconnected');
    })
  })

  // namespace를 만들때 데이터 베이스에 있는 post.chatroom.id(안에 값들로 message가 존재)를 event로 사용?

  // namespace와 room 연결된 클라이언트 중에 특정 클라이언트들과 소통하고 싶을 때(1:n 통신)
  // 룸(room)
  // - 네임스페이스 내 채널
  // - 같은 룸에서만 데이터 교환
  // - 룸에 입장(join), 여러 룸에 입장 가능
  // - 룸에서 떠나기

  // server.listen(PORT, () => {
  //     console.log(`Express http server is listening on port ${PORT}`)
  // })
}

// 소켓서버를 웹서버에 붙인다.

// //사용자명 랜덤 생성을 위한 배열
// const color = [
//     "yellow",
//     "green",
//     "red",
//     "blue",
//     "white",
//     "black",
// ]

// //소켓서버에 접속
// io.sockets.on('connection', (socket) => {
//   console.log('소켓 서버 접속');
// //소켓서버 접속 시, 사용자명 랜덤 생성
//   const username = color[ Math.floor(Math.random() * 6) ];
// //사용자가 방에 들어왔음을 접속자 본인을 제외한 나머지 사람들에게 알려준다.
//   socket.broadcast.emit('join', { username });

//   //client message 라는 이벤트명으로 대기
//   socket.on('client message', data => {
//       //연결된 모든 사람에게 메시지 송신
//       io.emit('server message', { 
//           username : username,
//           message : data.message 
//       });
//       //나를 제외한 다른 사람에게 메시지 송신
//       //socket.broadcast.emit('server message', { message : data.message });
//   });

//   //소켓서버 연결 종료  ( disconnect는 예약어 )
//   socket.on('disconnect', () => {
//     //사용자가 퇴장했음을 퇴장자 본인을 제외한 다른 사람들에게 알려준다.
//       socket.broadcast.emit('leave', { username });
//   });

// });
// module.exports = app.listen(port, () => {
//   console.log(`      🚀 Server is starting on ${port}`);
// });

// 채팅방의 번호는 post의 id로 만들기