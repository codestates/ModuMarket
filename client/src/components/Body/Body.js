import { Routes, Route } from "react-router-dom";
import Main from '../../pages/MainPage/Main'
import Signup from '../Modals/Signup'
import Login from '../Modals/Login'
import BoardPage from '../../pages/BoardPage/BoardPage'
import MyPage from '../../pages/MyPage/MyPage'
import Detail from '../../pages/BoardDetailPage/BoardDetailPage'


const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail" element={<Detail />} />
        </Routes>
    )
}
export default Body;