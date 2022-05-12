import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showRegisterModal, showConfirmModal, inputModalText, changeModalImg } from '../../../reducers/modalSlice';
import {ko} from 'date-fns/esm/locale';
import axios from 'axios';
import moment from "moment";
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
    const [errorMessage, setErrorMessage] = useState('사진을 제외한 모든 항목은 필수입니다.');
    const userId = useSelector((state) => state.userInfo.userInfo.id);
    const area_name = useSelector((state) => state.userInfo.userInfo.area_name);
    const [address, setAddress] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [files, setFiles] = useState("") 
    const [boardInfo, setBoardInfo] = useState({
        title: "",
        userId: userId, 
        category: 0,
        image: files,
        post_content: "",
        area_name : area_name, 
        post_location : address,
        isvalid : true,
        member_num : 1,
        member_min : 0,
        endtime : moment(endDate).format('YYYY-MM-DD'),

    })

    const handleInputValue = (key) => (e) => { // onChange 가 발생할 경우 값을 넣어주는 함수
        setBoardInfo({ ...boardInfo, [key]: e.target.value });
    };

    async function handleRegister() { // 입력한 값을 서버로 보내는 함수 
        
        let photoFile = document.getElementById("photofile");
        const formData = new FormData(); // 폼 태그로 이미지와 데이터를 한번에 보낼 수 있도록 하기 위한 접근
        const {title, userId, category, post_content, area_name,  isvalid, member_num, member_min, endtime} = boardInfo 
        formData.append("title", title);
        formData.append("category", category);
        formData.append("image", photoFile.files[0]);
        formData.append("post_content", post_content);
        formData.append("area_name", area_name); 
        formData.append("userId", userId); 
        formData.append("post_location", address);
        formData.append("isvalid", isvalid);
        formData.append("member_num", member_num);
        formData.append("member_min", member_min);
        formData.append("endtime", moment(endDate).format('YYYY-MM-DD'));   

        if(title === "" || address === "" || post_content === "" || member_min === 0){
            alert(errorMessage)
        }else{
            await axios({
                url : `${ REACT_APP_API_URL }/post`,
                method : 'POST',
                data : formData,
                headers : {
                    'Content-Type': 'multipart/form-data',
                    authorization : `Bearer ${accessToken}` 
                },
                withCredentials : true
            }).then((result) =>{
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showRegisterModal(false))
                dispatch(showConfirmModal(true));
                window.location.reload()

            })
        }
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
            <ModalBackground />
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
                        <option value={0}>패션, 뷰티</option>
                        <option value={1}>식품</option>
                        <option value={2}>생필품</option>
                        <option value={3}>취미, 반려</option>
                        <option value={4}>유아동</option>
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