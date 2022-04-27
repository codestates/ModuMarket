import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Main from '../../pages/MainPage/Main'
import Signup from '../Modals/Signup/Signup'
import Login from '../Modals/Login/Login'
import BoardPage from '../../pages/BoardPage/BoardPage'


const Body = () => {
    return (

        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
export default Body;