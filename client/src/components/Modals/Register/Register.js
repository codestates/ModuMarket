import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { showRegisterModal } from '../../../reducers/modalSlice';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config'
import {
    ModalBackground, ModalContainer, Wrap,
    TitleWrap, PhotoWrap, RegisterWrap,
    PhotoSearch, Photo,
    CategoryMemberWrap, Category,
    AtLeastMember, ContentWrap,
    Content, DateWrap, EndDate,
    PostLocationWrap, LocationButtonWrap,
    PostLocation, RegisterButtonWrap
} from './styled'

function Register() {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const [errorMessage, setErrorMessage] = useState('');
    const [address, setAddress] = useState("") // 공고글의 post_location
    const [endDate, setEndDate] = useState(new Date()) // 공고글의 endtime
    const [files, setFiles] = useState("") // 공고글의 사진 파일 미리보기를 위한 상태값
    const [boardInfo, setBoardInfo] = useState({
        title: "",
        userId: "", //공고글을 작성한 유저의 id state에 저장해둔 값을 넣어둘것임.
        category: 0,
        image: files,
        post_content: "",
        area_name: "", // 공고글을 작성한 유저의 동네위치 정보
        post_location: address,
        isvalid: true,
        member_num: 1,
        member_min: 0,
        endtime: endDate,
    })

    const handleInputValue = (key) => (e) => { // onChange 가 발생할 경우 값을 넣어주는 함수
        setBoardInfo({ ...boardInfo, [key]: e.target.value });
    };

    async function handleRegister() { // 입력한 값을 서버로 보내는 함수 
        let photoFile = document.getElementById("photofile");
        const formData = new FormData(); // 폼 태그로 이미지와 데이터를 한번에 보낼 수 있도록 하기 위한 접근
        const { title, userId, category, post_content, area_name, post_location, isvalid, member_num, member_min, endtime } = boardInfo


        console.log(photoFile.files[0])
        formData.append("title", JSON.stringify(title));
        formData.append("category", category);
        formData.append("image", photoFile.files[0]);
        formData.append("post_content", JSON.stringify(post_content));
        formData.append("area_name", JSON.stringify(area_name));
        formData.append("post_location", JSON.stringify(address));
        formData.append("isvalid", JSON.stringify(isvalid));
        formData.append("member_num", member_num);
        formData.append("member_min", member_min);
        formData.append("endtime", endtime);

        // console.log(formData.values) 이렇게 접근하면 안된다.å
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }


        // if(title === "" || area_name === "" || post_content === "" || member_min === 0){

        //     setErrorMessage("사진을 제외한 모든 항목은 필수입니다.")
        //     //alert(errorMessage)
        // }else{
        const result = await axios({
            url: `${REACT_APP_API_URL}/post`,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })

        console.log(result)
        //}

    }

    // 사진 미리보기 파일 읽어오기
    function onLoadFile(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e)

        return new Promise((resolve) => {
            reader.onload = () => {
                setFiles(reader.result);
                resolve();
            }
        })
    }

    // 주소 검색하기
    function get_address() {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // const zcode = data.zonecode; // 우편번호
                // const roadAddr = data.roadAddress; // 도로명 주소
                const jibunAddr = data.jibunAddress; // 지번주소
                setAddress(jibunAddr)
            }
        }).open();

    }



    return (
        <form onSubmit={(e) => e.preventDefault()} >
            <ModalBackground onClick={() => dispatch(showRegisterModal(false))} />
            <ModalContainer>
                <Wrap>
                    <p onClick={() => dispatch(showRegisterModal(false))}>&times;</p>
                </Wrap>
                <RegisterWrap>
                    <h2>공구 등록하기</h2>
                </RegisterWrap>
                <TitleWrap>
                    <p>제목</p>
                    <input type="text" onChange={handleInputValue("title")} ></input>
                </TitleWrap>
                <PhotoWrap>
                    <p>사진</p>
                    <label htmlFor="photofile">사진 선택</label>
                    <input
                        id="photofile"
                        type="file"
                        accept="image/jpg, image/png, image/jpeg"
                        multiple="multiple"
                        onChange={(e) => { onLoadFile(e.target.files[0]) }} />
                </PhotoWrap>
                <PhotoSearch>
                    <Photo>
                        {files && <img src={files} alt="preview-img" />}
                    </Photo>
                </PhotoSearch>
                <CategoryMemberWrap>
                    <Category onChange={handleInputValue("category")}>
                        <option value="0">패션, 뷰티</option>
                        <option value="1">식품</option>
                        <option value="2">생필품</option>
                        <option value="3">취미, 반려</option>
                        <option value="4">유아동</option>
                    </Category>
                    <AtLeastMember>
                        <input type="number" placeholder="참가 최소인원을 설정해주세요" onChange={handleInputValue("member_min")}></input>
                    </AtLeastMember>
                </CategoryMemberWrap>
                <ContentWrap>
                    <p>내용</p>
                    <Content >
                        <textarea onChange={handleInputValue("post_content")}></textarea>
                    </Content>
                </ContentWrap>
                <DateWrap>
                    <p>마감 날짜 선택</p>
                    <EndDate minDate={new Date()} locale={ko} dateFormat="yyyy년 MM월 dd일" selected={endDate} onChange={date => setEndDate(date)} />
                </DateWrap>
                <PostLocationWrap>
                    <p>만남장소</p>
                    <PostLocation>
                        <input
                            placeholder="주소를 검색해주세요"
                            input="text"
                            value={address}
                            readOnly
                        ></input>
                        <LocationButtonWrap>
                            <button onClick={() => get_address()}>검색</button>
                        </LocationButtonWrap>
                    </PostLocation>
                </PostLocationWrap>
                <RegisterButtonWrap>
                    <button onClick={() => handleRegister()}>등록하기</button>
                </RegisterButtonWrap>
            </ModalContainer>
        </form>
    )
}

export default Register;