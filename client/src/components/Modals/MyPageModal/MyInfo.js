import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserArea, getUserImg } from '../../../reducers/userInfoSlice';
import {
    showMyInfoModal,
    showMyPwCheckModal,
    showSignoutModal,
    showSignoutSocialModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../../reducers/modalSlice';
import {
    ModalBackground,
    ModalContainer,
    ModalInformRow,
    ModalNameWrap,
    ModalAgeWrap,
    NameAgeWrap,
    Name, Age,
    EmailWrap,
    AreaWrap,
    ModalText,
    ModalImg,
    ProfileImg,
    ModalImgText,
    ModalButton,
    SignoutText,
} from './styled'
import { profileImg } from '../../../assets/images'


const MyInfo = () => {

    const dispatch = useDispatch();
    const myInfo = useSelector((state) => state.userInfo.userInfo);
    const myImg = useSelector((state) => state.userInfo.userImg);
    const myStatus = useSelector((state) => state.userInfo.userStatus);
    const accessToken = useSelector((state) => state.login.accessToken);
    const [newArea, setNewArea] = useState('');
    const [file, setFile] = useState('');


    /* 전체 둘러보기 가능하도록 유저의 위치를 전체로 만드는 함수 */
    const makeUserOverall = () => {
        setNewArea('전체');
        dispatch(changeUserArea('전체'));
    }

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

    /* 프로필 사진 이미지 불러오기 */
    const handleImgUpload = () => {
        let photoFile = document.getElementById("photofile");
        const formData = new FormData();

        if (photoFile.files[0]) {
            // 전에 있던 사진의 이름 
            formData.append("formerImage", myImg);
            formData.append("newImage", photoFile.files[0]);
        }
        /* 서버로 이미지 등록 요청 */
        axios.post(`${REACT_APP_API_URL}/user/image`,
            formData
            ,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }
        ).then((result) => {
            console.log(result.data.data);
            //서버로부터 이미지 경로를 받아와야함
            //응답 성공시 s3에 있는 이미지 경로를 받아와서 리덕스 userInfo.userImg에 저장
            dispatch(getUserImg(result.data.data));
            dispatch(inputModalText('회원 정보 수정이 완료되었습니다'));
            dispatch(changeModalImg('check_woman1'));
            dispatch(showConfirmModal(true));
            dispatch(showMyInfoModal(false));
        }).catch((err) => {
            //default profile img
            console.log(err.response.data);
            dispatch(inputModalText(err.response.data.message));
            dispatch(changeModalImg('check_skull'));
            dispatch(showConfirmModal(true));

        })


    }

    function onLoadFile(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e)

        return new Promise((resolve) => {
            reader.onload = () => {
                setFile(reader.result);
                resolve();
            }
        })
    }


    useEffect(() => {
        if (newArea) {
            handleInfoChange(newArea);
        }
    }, [newArea])

    useEffect(() => {
        setFile(file)
    }, [file])

    return (
        <>
            <ModalBackground />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showMyInfoModal(false))}>&times;</span>
                    <h2>마이 페이지</h2>
                </ModalText>
                <ModalImg>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <input
                            id="photofile"
                            name='image'
                            type="file"
                            accept="image/jpg, image/png, image/jpeg"
                            multiple={false}
                            onChange={(e) => {
                                onLoadFile(e.target.files[0])

                            }}
                            style={{ visibility: "hidden" }} />
                    </form>
                    <ProfileImg>
                        <label htmlFor="photofile">
                            {
                                file ?
                                    <img src={file} alt='profile preview' />
                                    :
                                    myImg === 'default' ?
                                        <img src={profileImg} alt='profileImg' />
                                        : <img src={`${REACT_APP_API_URL}/user/image/${myImg}/`} alt='profileImg' />
                            }
                        </label>
                        <ModalImgText>
                            <label htmlFor="photofile">이미지 업로드</label>
                        </ModalImgText>
                    </ProfileImg>
                </ModalImg>
                <ModalInformRow>
                    <NameAgeWrap>
                        <ModalNameWrap>
                            <p>이름</p>
                            <Name>
                                <span>{myInfo.name}</span>
                            </Name>
                        </ModalNameWrap>
                        <ModalAgeWrap>
                            <p>나이</p>
                            <Age>
                                <span>{myInfo.age}</span>
                            </Age>
                        </ModalAgeWrap>
                    </NameAgeWrap>
                    <EmailWrap>
                        <p>이메일</p>
                        <p>{myInfo.email}</p>
                    </EmailWrap>
                    <AreaWrap>
                        <p>나의 동네</p>
                        <p>{myInfo.area_name}</p>
                    </AreaWrap>
                </ModalInformRow>
                <ModalButton area={'area'} onClick={getUserLocation}>
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
                    </>
                    :
                    <></>

                }
                <ModalButton onClick={handleImgUpload}>
                    수정 완료하기
                </ModalButton>
                <ModalText>

                    <button onClick={makeUserOverall}>제한 없이 전체 동네 둘러보기 </button>
                </ModalText>
                <SignoutText>
                    <p>Modumarket을 더이상 이용하지 않는다면?
                        <button onClick={() => {
                            dispatch(showSignoutModal(true));
                        }}>탈퇴하기</button>
                    </p>
                </SignoutText>
            </ModalContainer>

        </>
    )
}

export default MyInfo;