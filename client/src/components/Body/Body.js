import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Main from '../../pages/MainPage/Main'
import BoardPage from '../../pages/BoardPage/BoardPage'
import MyPage from '../../pages/MyPage/MyPage'
import Detail from '../../pages/BoardDetailPage/BoardDetailPage'


const Body = () => {

    const isLogin = useSelector((state) => state.login.isLogin);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={isLogin ? <MyPage /> : <Navigate to="/" />} />
            <Route path="/detail" element={<Detail />} />
        </Routes>
    )
}
export default Body;