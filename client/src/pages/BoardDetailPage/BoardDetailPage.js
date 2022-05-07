import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import {dummyData} from '../../assets/dummy'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { REACT_APP_API_URL } from '../../config'
import {Wrap} from './styled'
import DetailSection from '../../components/BoardDetail/DetailSection/DetailSection'
import ContentSection from '../../components/BoardDetail/ContentSection/ContentSection'
import MapSection from '../../components/BoardDetail/MapSection/MapSection'

function BoardDetail(){
    const location = useLocation().state; // useNavigate로 가져오는 카드의 id를 받아옴
    const accessToken = useSelector((state) => state.login.accessToken);
    
    const [cardInfo, setCardInfo] = useState()

    // console.log(location)
    async function handleCardDetail (){
        const result = await axios({
            url : `${REACT_APP_API_URL}/post/${location.cardId}`,
            method: 'GET',
            headers : {
                "Content-Type": "application/json",
                authorization : `Bearer ${accessToken}`,
            },
            withCredentials : true
        })
        //console.log(result.data)
        setCardInfo(result.data.data)
    }

    useEffect(()=> {
        handleCardDetail()
    },[])

    
    return (
        <Wrap>
            { cardInfo ? <DetailSection info = {cardInfo}/> : <div>Loading</div>}
            { cardInfo ? <ContentSection info = {cardInfo}/> : <div>Loading</div>}
            { cardInfo ? <MapSection info = {cardInfo}/> : <div>Loading</div>}
        </Wrap>
    )
}

export default BoardDetail;