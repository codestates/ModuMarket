import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserArea, getUserImg } from '../../../reducers/userInfoSlice';
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
    ModalBackground,
    ModalNameWrap,
    ModalContainer,
    ModalAgeWrap,
    ModalText,
    ModalImg,
    ProfileImg,
    ModalImgText,
    ModalInformRow,
    ModalButton
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


    // 이미지 불러오는거

    /* 프로필 사진 이미지 불러오기 */
    const uploadedImg = useRef(null);
    const imageUploader = useRef(null);
    const handleImgUpload = e => {
        let photoFile = document.getElementById("photofile");
        const formData = new FormData();

        if (photoFile.files[0]) {
            // 전에 있던 사진의 이름 넣으면 됨.
            formData.append("formerImage", myImg);
            formData.append("newImage", photoFile.files[0]);
        }

        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImg;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
                setFile(reader.result);
            }
            reader.readAsDataURL(file)
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
                console.log(result);
                //서버로부터 이미지 경로를 받아와야함
                //응답 성공시 s3에 있는 이미지 경로를 받아와서 리덕스 userInfo.userImg에 저장
                dispatch(getUserImg(`${ REACT_APP_API_URL }/user/image/${result.data.data}/`));
            }).catch((err) => {
                //default profile img
                console.log(err.response.message);
                // dispatch(getUserImg(profileImg));
                //임시방편으로 404일때 모달에서 등록한 img를 리덕스 스토어에 저장해 MyPage에서도 띄움
                // dispatch(getUserImg(reader.result));
            })

        }
    }
    console.log(myImg);

    // function onLoadFile(e) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e)

    //     return new Promise((resolve) => {
    //         reader.onload = () => {
    //             setFile(reader.result);
    //             resolve();
    //         }
    //     })
    // }


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
            <ModalBackground onClick={() => dispatch(showMyInfoModal(false))} />
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
                            onChange={handleImgUpload}
                            ref={imageUploader}
                            style={{
                                display: "none"
                            }} />
                    </form>
                    <img ref={uploadedImg} src={myImg} alt='profileImg' onClick={() => imageUploader.current.click()} />
                    <ModalImgText>
                        이미지 업로드
                    </ModalImgText>
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