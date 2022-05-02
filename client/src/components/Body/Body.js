import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Main from '../../pages/MainPage/Main'
import Signup from '../Modals/Signup'
import Login from '../Modals/Login'
import BoardPage from '../../pages/BoardPage/BoardPage'
import MyPage from '../../pages/MyPage/MyPage'


const Body = () => {

    const isLogin = useSelector((state) => state.login.isLogin);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={isLogin ? <MyPage /> : <Navigate to="/" />} />
        </Routes>
    )
}
export default Body;