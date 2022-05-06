import { useSelector } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import Confirm from './Confirm';
import Register from './Register/Register';


const ModalController = () => {
    const {
        loginModal,
        signupModal,
        confirmModal,
        registerModal

    } = useSelector((state) => state.modal);

    return (
        <>
            {loginModal && <Login />}
            {signupModal && <Signup />}
            {confirmModal && <Confirm />}
            {registerModal && <Register />}
        </>
    )
}

export default ModalController;