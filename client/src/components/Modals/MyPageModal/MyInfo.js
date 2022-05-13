import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserArea } from '../../../reducers/userInfoSlice';
import {
    showMyInfoModal,
    showMyPwCheckModal,
    showMyNewPwModal,
    showSignoutModal,
    showSignoutSocialModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../../reducers/modalSlice';
import {
    ModalBackground, ModalNameWrap,
    ModalContainer, ModalAgeWrap,
    ModalText,
    ModalImg,
    ModalInformRow,
    ModalButton
} from './styled'
import { profileImg } from '../../../assets/images'


const MyInfo = () => {

    const dispatch = useDispatch();
    const myInfo = useSelector((state) => state.userInfo.userInfo);
    const myStatus = useSelector((state) => state.userInfo.userStatus);
    const accessToken = useSelector((state) => state.login.accessToken);
    const [newArea, setNewArea] = useState('');

    /* 카카오지도 API로 현재 유저 좌표를 동단위로 변환 */
    const alterAddress = (position) => {
        let x = position.coords.longitude;
        let y = position.coords.latitude;
        if (x && y) {
            axios.get(
                `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then(async (result) => {
                let location = result.data.documents[0].region_3depth_name;
                dispatch(changeUserArea(`${location}`));
                setNewArea(`${location}`);
            })
        }
    }
    /* 위치인증 확인 요청 */
    const getUserLocation = () => {
        dispatch(inputModalText('로 딩 중'));
        dispatch(changeModalImg('loading'));
        dispatch(showConfirmModal(true));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //동단위로 주소 변환
                alterAddress(position);

            });
        } else {
            dispatch(inputModalText('위치 인증 실패'));
            dispatch(changeModalImg('question'));
            dispatch(showConfirmModal(true));

        }

    }
    const handleInfoChange = (newArea) => {
        //주소 수정하기 요청
        axios.patch(
            `${REACT_APP_API_URL}/user`,
            {
                area_name: newArea
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }
        ).then(() => {
            dispatch(inputModalText(`${newArea} 동네로 변경되었습니다`));
            dispatch(changeModalImg('check_woman1'));
            dispatch(showConfirmModal(true));
            dispatch(showMyInfoModal(false));
        }).catch((err) => {
            dispatch(inputModalText(err.response.data.message));
            dispatch(changeModalImg('question'));
            dispatch(showConfirmModal(true));
        })
    }

    useEffect(() => {
        if (newArea) {
            handleInfoChange(newArea);
        }
    }, [newArea])

    return (
        <>
            <ModalBackground onClick={() => dispatch(showMyInfoModal(false))} />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showMyInfoModal(false))}>&times;</span>
                    <h2>마이 페이지</h2>
                </ModalText>
                <ModalImg>
                    <img src={profileImg[1]} alt='profileImg' />
                </ModalImg>
                <ModalInformRow>
                    <ModalNameWrap>
                        <p>이름</p>
                        <span>{myInfo.name}</span>
                    </ModalNameWrap>
                    <ModalAgeWrap>
                        <span>나이</span>
                        <p>{myInfo.age}</p>
                    </ModalAgeWrap>
                </ModalInformRow>
                <ModalInformRow>
                    <span>이메일</span>
                    <p>{myInfo.email}</p>
                </ModalInformRow>
                <ModalInformRow>
                    <span>나의 동네</span>
                    <p>{myInfo.area_name}</p>
                </ModalInformRow>
                <ModalButton onClick={getUserLocation}>
                    동네인증 다시하기
                </ModalButton>
                {/* 사용자의 로그인 상태(소셜로그인인지, 일반인지)에 따라 버튼 보여주기 */}
                {myStatus === 'own' ?
                    <>
                        <ModalButton onClick={() => {
                            dispatch(showMyPwCheckModal(true))
                        }}>
                            비밀번호 변경하기
                        </ModalButton>
                        <ModalButton onClick={() => {
                            dispatch(showMyNewPwModal(true))
                        }}>
                            비밀번호 입력하기
                        </ModalButton>
                    </>
                    :
                    <></>

                }
                <ModalText>
                    <p>Modumarket을 더이상 이용하지 않는다면?
                        <button onClick={() => {
                            dispatch(showSignoutModal(true));
                        }}>탈퇴하기</button>
                    </p>
                </ModalText>
            </ModalContainer>

        </>
    )
}

export default MyInfo;