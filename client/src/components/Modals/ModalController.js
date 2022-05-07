import { useSelector } from 'react-redux';
import Login from './Login';
import SignupGate from './SignupGate';
import Signup from './Signup';
import SignupSocial from './SignupSocial'
import Confirm from './Confirm';


const ModalController = () => {
    const {
        loginModal,
        signupGateModal,
        signupSocialModal,
        signupModal,
        confirmModal,

    } = useSelector((state) => state.modal);

    return (
        <>
            {loginModal && <Login />}
            {signupGateModal && <SignupGate />}
            {signupModal && <Signup />}
            {signupSocialModal && <SignupSocial />}
            {confirmModal && <Confirm />}
        </>
    )
}

export default ModalController;