import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import Main from '../../pages/MainPage/Main'
import ChattingRoom from '../../pages/ChattingPage/ChattingRoom'
import BoardPage from '../../pages/BoardPage/BoardPage'
import MyPage from '../../pages/MyPage/MyPage'
import Detail from '../../pages/BoardDetailPage/BoardDetailPage'
import Auth from './Auth';

// io를 만들면서 서버로 접속시도(io()). => 연결이 되면 connect event 발생.
const socket =  io.connect('http://localhost:4000')
// console.log(socket)

let room = '채팅방1'

const Body = () => {
    const isLogin = useSelector((state) => state.login.isLogin);
    const [state, setState] = useState({message:'', name:''})
    const [chat, setChat] =useState([])
  
    useEffect(()=>{
      // 이벤트 수신: socket.on("EVENT", function(data) {})
      // data(parameter)는 서버에서 등록한 data 어떤 식으로 data를 보내주는지
      socket.emit('type', (room));

      socket.on('type', (data)=>{

        const {arr, time, room} = data;
        // console.log(data);
        console.log(room + '에 입장하셨습니다.')
        // setChat([...chat,{name, message, time}]);
        let temp = [];
        arr.forEach(el => {
          console.log(el)
          temp.push({
            name: el.username,
            message: el.message_content,
            time
          })
          setChat([...temp]);
        });
      })
    }, [])

    useEffect(()=>{
      // 이벤트 수신: socket.on("EVENT", function(data) {})
      // data(parameter)는 서버에서 등록한 data 어떤 식으로 data를 보내주는지
      socket.on('message', ({name, message, time, room}) => {
        // console.log(data);
        console.log(room + '에 입장하셨습니다.')
        setChat([...chat,{name, message, time}]);
      })});
  
    console.log(chat)
    const onTextChange = e =>{
      setState({...state,[e.target.name]: e.target.value})
    }
  
    const onMessageSubmit =(e)=>{
      e.preventDefault()
      const {name, message} = state
      // socket.emit('message',{name, message})
      // socket.emit('join_room', 'room1');
      socket.emit('message',{name, message, room})
      setState({message : '',name})
    }
    
    const renderChat =()=>{
      return chat.map(({name, message, time},index)=>(
        <div key={index}>
          <h3>{name}</h3>
          <span>{message + ' ' + time}</span>
        </div>
      ))
    }

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route path="/" element={<ChattingRoom state={state} onTextChange={onTextChange} onMessageSubmit={onMessageSubmit} renderChat={renderChat}/>} /> */}
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={isLogin ? <MyPage /> : <Navigate to="/" />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/sign/kakao/callback" element={<Auth />} />
        </Routes>
    )
}
export default Body;