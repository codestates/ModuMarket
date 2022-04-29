import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import MainPage from '../../pages/MainPage/MainPage'
import Signup from '../Modals/Signup'
import Login from '../Modals/Login'
import BoardPage from '../../pages/BoardPage/BoardPage'


const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
export default Body;