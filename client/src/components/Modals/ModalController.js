import { useSelector } from 'react-redux';
import Login from './Login';
import SignupGate from './SignupGate';
import Signup from './Signup';
import SignupSocial from './SignupSocial'
import Confirm from './Confirm';
import Register from './Register/Register';
import Chatting from './Chatting/Chatting'
import MyInfo from './MyPageModal/MyInfo';
import PwCheck from './MyPageModal/PwCheck';
import PwInput from './MyPageModal/PwInput';
import Signout from './SignoutModal/Signout';
import ReviseRegister from './ReviseRegister/ReviseRegister'
import DeleteModal from './DeleteModal/DeleteModal'
import LoginConfirmModal from './LoginConfirmModal/LoginConfirmModal'
import RecruitmentCompleteModal from './RecruitmentCompleteModal/RecruitmentCompleteModal'
import ParticipateModal from './ParticipateModal/participateModal'
import CancelParticipateModal from './CancelParticipateModal/CancelParticipateModal'


const ModalController = () => {
    const {
        loginModal,
        signupGateModal,
        signupSocialModal,
        signupModal,
        confirmModal,
        registerModal,
        chattingModal,
        myInfoModal,
        myPwCheckModal,
        myNewPwModal,
        signoutModal,
        signoutSocialModal,
        reviseRegisterModal,
        deleteModal,
        loginConfirmModal,
        recruitmentCompleteModal,
        participateModal,
        cancelParticipateModal

    } = useSelector((state) => state.modal);

    return (
        <>
            {loginModal && <Login />}
            {signupGateModal && <SignupGate />}
            {signupModal && <Signup />}
            {signupSocialModal && <SignupSocial />}
            {registerModal && <Register />}
            {chattingModal && <Chatting />}
            {myInfoModal && <MyInfo />}
            {myPwCheckModal && <PwCheck />}
            {myNewPwModal && <PwInput />}
            {signoutModal && <Signout />}
            {signoutSocialModal && <Signout />}
            {confirmModal && <Confirm />}
            {reviseRegisterModal && <ReviseRegister />}
            {deleteModal && <DeleteModal />}
            {loginConfirmModal && <LoginConfirmModal />}
            {recruitmentCompleteModal && <RecruitmentCompleteModal />}
            {participateModal && <ParticipateModal />}
            {cancelParticipateModal && <CancelParticipateModal />}
        </>
    )
}

export default ModalController;