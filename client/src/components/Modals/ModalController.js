import { useSelector } from 'react-redux';
import Login from './LoginModal/LoginModal';
import SignupGate from './SignupGate/SignupGate';
import SignupModal from './SignupModal/SignupModal';
import SignupSocialModal from './SignupSocialModal/SignupSocialModal'
import Confirm from './Confirm/Confirm';
import ConfirmModalToBoard from './ConfirmModalToBoard/ConfirmModalToBoard';
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
import AlertModal from './AlertModal/AlertModal'
import ConfirmReloadModal from './ConfirmReload/ConfirmReload';

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
        cancelParticipateModal,
        confirmModalToBoard,
        alertModal,
        confirmReloadModal

    } = useSelector((state) => state.modal);

    return (
        <>

            {loginModal && <Login />}
            {signupGateModal && <SignupGate />}
            {signupModal && <SignupModal />}
            {signupSocialModal && <SignupSocialModal />}
            {registerModal && <Register />}
            {chattingModal && <Chatting />}
            {myInfoModal && <MyInfo />}
            {myPwCheckModal && <PwCheck />}
            {myNewPwModal && <PwInput />}
            {signoutModal && <Signout />}
            {signoutSocialModal && <Signout />}
            {reviseRegisterModal && <ReviseRegister />}
            {deleteModal && <DeleteModal />}
            {loginConfirmModal && <LoginConfirmModal />}
            {recruitmentCompleteModal && <RecruitmentCompleteModal />}
            {participateModal && <ParticipateModal />}
            {cancelParticipateModal && <CancelParticipateModal />}
            {confirmModalToBoard && <ConfirmModalToBoard />}
            {alertModal && <AlertModal />}
            {confirmModal && <Confirm />}
            {confirmReloadModal && <ConfirmReloadModal />}
        </>
    )
}

export default ModalController;