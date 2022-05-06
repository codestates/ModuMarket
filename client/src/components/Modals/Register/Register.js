import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { showRegisterModal } from '../../../reducers/modalSlice';
import {ko} from 'date-fns/esm/locale';
import {
        ModalBackground, ModalContainer, Wrap,
        TitleWrap, PhotoWrap,RegisterWrap,
        PhotoSearch, Photo,
        CategoryMemberWrap, Category, 
        AtLeastMember,ContentWrap,
        Content,DateWrap,EndDate,
        PostLocationWrap,LocationButtonWrap,
        PostLocation,RegisterButtonWrap} from './styled'

function Register(){
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [boardInfo, setBoardInfo] = useState({
        title: "",
        userId:  "", //공고글을 작성한 유저의 id state에 저장해둔 값을 넣어둘것임.
        category: 0,
        image: "",
        post_content: "",
        area_name : "", // 공고글을 작성한 유저의 동네위치 정보
        post_location : "",
        isvalid : true,
        member_num : 1,
        member_min : 0,
        endtime : "",
    })
    const [address, setAddress] = useState("")
    const [endDate, setEndDate] = useState(new Date())
    const [files, setFiles] = useState("")

    const handleInputValue = (key) => (e) => {
        setBoardInfo({ ...boardInfo, [key]: e.target.value });
    };

    function handleRegister () {

    }

    // 사진 미리보기 파일 읽어오기
    function onLoadFile (e) {
        const reader = new FileReader();
        reader.readAsDataURL(e)

        return new Promise((resolve) => {
            reader.onload = () =>{
                setFiles(reader.result);
                resolve();
            }
        })
    }

    // 주소 검색하기
   function get_address(){
    new window.daum.Postcode({
        oncomplete: function(data){
            const zcode = data.zonecode; // 우편번호
            const roadAddr = data.roadAddress; // 도로명 주소
            const jibunAddr = data.jibunAddress; // 지번주소
            setAddress(jibunAddr)
        }
    }).open();
        
   }

    

    return (
        <>
        <ModalBackground onClick ={() => dispatch(showRegisterModal(false))}/>
            <ModalContainer>
                <Wrap>
                    <p onClick = {() => dispatch(showRegisterModal(false))}>&times;</p>
                </Wrap>
                <RegisterWrap>
                    <h2>공구 등록하기</h2>
                </RegisterWrap>
                <TitleWrap>
                    <p>제목</p>
                    <input type="text"></input>
                </TitleWrap>
                <PhotoWrap>
                    <p>사진</p>
                    <label htmlFor="photofile">사진 선택</label>
                    <input 
                        id="photofile" 
                        type="file" 
                        accept="image/jpg, image/png, image/jpeg" 
                        onChange ={ (e) => {onLoadFile(e.target.files[0])}}/>
                </PhotoWrap>
                <PhotoSearch>
                    <Photo>
                        {files && <img src={files} alt="preview-img"/>}
                    </Photo>
                </PhotoSearch>
                <CategoryMemberWrap>
                    <Category>
                        <option value="0">패션, 뷰티</option>
                        <option value="1">식품</option>
                        <option value="2">생필품</option>
                        <option value="3">취미, 반려</option>
                        <option value="4">유아동</option>
                    </Category>
                    <AtLeastMember>
                    <input type="number" placeholder="참가 최소인원을 설정해주세요" ></input>
                </AtLeastMember>
                </CategoryMemberWrap>
                <ContentWrap>
                    <p>내용</p>
                    <Content>
                        <textarea></textarea>
                    </Content>
                </ContentWrap>
                <DateWrap>
                    <p>마감 날짜 선택</p>
                    <EndDate minDate={new Date()} locale={ko} dateFormat="yyyy년 MM월 dd일" selected={endDate} onChange ={date => setEndDate(date)}/>
                </DateWrap>
                <PostLocationWrap>
                    <p>만남장소</p>
                    <PostLocation>
                        <input placeholder="주소를 검색해주세요" input="text" value={address} readOnly></input>
                        <LocationButtonWrap>
                            <button onClick = {() => get_address()}>검색</button>
                        </LocationButtonWrap>
                    </PostLocation>
                </PostLocationWrap>
                <RegisterButtonWrap>
                        <button>등록하기</button>
                </RegisterButtonWrap>
            </ModalContainer>
        </>
    )
}

export default Register;