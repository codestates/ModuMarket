import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../config'
import {Wrap} from './styled'
import {getCardInfo, isAppliedInfo} from '../../reducers/boardSlice'
import DetailSection from '../../components/BoardDetail/DetailSection/DetailSection'
import ContentSection from '../../components/BoardDetail/ContentSection/ContentSection'
import MapSection from '../../components/BoardDetail/MapSection/MapSection'

function BoardDetail(){
    const location = useLocation().state; // useNavigate로 가져오는 카드의 id를 받아옴
    const accessToken = useSelector((state) => state.login.accessToken);
    const dispatch = useDispatch();
    const [cardInfo, setCardInfo] = useState();
    const userInfo = useSelector((state) => state.userInfo.userInfo.id);
    console.log(userInfo)

    async function handleCardDetail (){
        await axios({
            url : `${REACT_APP_API_URL}/post/${location.cardId}`,
            method: 'POST',
            data: {
                _id: userInfo
            },
            headers : {
                "Content-Type": "application/json",
                authorization : `Bearer ${accessToken}`,
            },
            withCredentials : true
        }).then((result) => {
            let detail = {
                cardInfo: result.data.data
            }

            let isApplied = {
                isApplied: result.data.isapplied
            }
            console.log(result)
            dispatch(getCardInfo(detail))
            dispatch(isAppliedInfo(isApplied))
            setCardInfo(result.data)
        })  
    }

    useEffect(()=> {
        handleCardDetail()
    }, [])

    return (
        <Wrap>
            { cardInfo ? <DetailSection info = {cardInfo}/> : <div>Loading</div>}
            { cardInfo ? <ContentSection info = {cardInfo}/> : <div>Loading</div>}
            { cardInfo ? <MapSection info = {cardInfo}/> : <div>Loading</div>}
        </Wrap>
    )
}

export default BoardDetail;