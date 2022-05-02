import { useSelector } from 'react-redux';
import Login from './Login';
import Signup from './Signup';
import Confirm from './Confirm';


const ModalController = () => {
    const {
        loginModal,
        signupModal,
        confirmModal,

    } = useSelector((state) => state.modal);

    return (
        <>
            {loginModal && <Login />}
            {signupModal && <Signup />}
            {confirmModal && <Confirm />}
        </>
    )
}

export default ModalController;