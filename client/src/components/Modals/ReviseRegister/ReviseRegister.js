import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showConfirmModal, showReviseRegisterModal, inputModalText, changeModalImg } from '../../../reducers/modalSlice'
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
} from '../Register/styled'


const ReviseRegister = () => {
    
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const userId = useSelector((state) => state.userInfo.userInfo.id);
    const cardInfo = useSelector((state) => state.board.cardInfo);
    console.log(cardInfo);
    const [address, setAddress] = useState(cardInfo.post_location) 
    const [photo, setPhoto] = useState(false)
    const [endDate, setEndDate] = useState(new Date())
    const [files, setFiles] = useState(cardInfo.image)
    const [boardInfo, setBoardInfo] = useState({
        title: cardInfo.title,
        userId: {_id : userId}, 
        category: cardInfo.category,
        image: files,
        post_content: cardInfo.post_content,
        area_name : cardInfo.area_name, 
        post_location : address,
        isvalid : cardInfo.isvalid,
        member_num : cardInfo.member_num,
        member_min : cardInfo.member_min,
        endtime : moment(endDate).format('YYYY-MM-DD'),

    })

    const handleInputValue = (key) => (e) => { // onChange 가 발생할 경우 값을 넣어주는 함수
        setBoardInfo({ ...boardInfo, [key]: e.target.value });
    };

    async function handleReviseRegister() { // 입력한 값을 서버로 보내는 함수 
        
        let photoFile = document.getElementById("photofile");
        const formData = new FormData(); // 폼 태그로 이미지와 데이터를 한번에 보낼 수 있도록 하기 위한 접근
        const {title, userId, category, post_content, area_name,  isvalid, member_num, member_min, endtime} = boardInfo 
        formData.append("title", title);
        formData.append("category", category);
        // console.log(photoFile.files[0])
        if (photoFile.files[0]) {
            // 전에 있던 사진의 이름 넣으면 됨.
            formData.append("formerImage", cardInfo.image)
            formData.append("newImage", photoFile.files[0]);
        }
        formData.append("post_content", post_content);
        formData.append("area_name", area_name); 
        formData.append("userId", userId); 
        formData.append("post_location", address);
        formData.append("isvalid", isvalid);
        formData.append("member_num", member_num);
        formData.append("member_min", member_min);
        formData.append("endtime", endtime);
        formData.append("_id", cardInfo._id);

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // } 
        // console.log(formData)

        if(title === "" || address === "" || post_content === "" || member_min === 0){
            alert('사진을 제외한 모든 항목은 필수입니다.')
        }else{
            axios({
                url : `${ REACT_APP_API_URL }/post`,
                method : 'PATCH',
                data : formData,
                headers : {
                    'Content-Type': 'multipart/form-data',
                    authorization : `Bearer ${accessToken}` 
                },
                withCredentials : true
            }).then((result) =>{
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showReviseRegisterModal(false))
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
                setPhoto(true)
                resolve();
            }
        })
    }

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
            <ModalBackground onClick={() => dispatch(showReviseRegisterModal(false))} />
            <ModalContainer>
                <Wrap>
                    <p onClick={() => dispatch(showReviseRegisterModal(false))}>&times;</p>
                </Wrap>
                <RegisterWrap>
                    <h2>공구 수정하기</h2>
                </RegisterWrap>
                <TitleWrap>
                    <p>제목</p>
                    <input type="text" onChange={handleInputValue("title")}  value={boardInfo.title}/>
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
                    {
                        photo ? 
                        <Photo>
                        {files && <img src={files} alt="preview-img" />}
                        </Photo>  
                        :
                        <Photo>
                        {files && <img src={`${ REACT_APP_API_URL }/post/image/${files}/`} alt="preview-img" />}
                        </Photo>
                    }
                    
                </PhotoSearch>
                <CategoryMemberWrap>
                    <Category onChange={handleInputValue("category")} value={boardInfo.category}>
                        <option value={0}>패션, 뷰티</option>
                        <option value={1}>식품</option>
                        <option value={2}>생필품</option>
                        <option value={3}>취미, 반려</option>
                        <option value={4}>유아동</option>
                    </Category>
                    <AtLeastMember>
                        <input type="number" placeholder="참가 최소인원을 설정해주세요" onChange={handleInputValue("member_min")} value={boardInfo.member_min}/>
                    </AtLeastMember>
                </CategoryMemberWrap>
                <ContentWrap>
                    <p>내용</p>
                    <Content >
                        <textarea onChange={handleInputValue("post_content")} value={boardInfo.post_content}></textarea>
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
                    <button onClick={() => handleReviseRegister()}>수정하기</button>
                </RegisterButtonWrap>
            </ModalContainer>
        </form>
    )
    
}

export default ReviseRegister