import React from 'react';
import {useNavigate} from 'react-router-dom';
import FoodIcon from '../../assets/food_icon.png';
import BabiesIcon from '../../assets/babies_icon.png';
import FashionIcon from '../../assets/fashion_icon.png';
import HobbiesIcon from '../../assets/hobbies_icon.png';
import NecessityIcon from '../../assets/necessity_icon.png';
import LocationIcon from '../../assets/location_icon.png';
import NullImage from '../../assets/photo.png';
import { REACT_APP_API_URL } from '../../config'
import {
    Section,
    CardWrap,
    Card,
    CardPhoto,
    CardCategoryWrap,
    CardCategoryPhoto,
    CardCategory,
    CardTitle,
    CardContent,
    CardLocation,
    IsValid,
    } from './styled'

function Cards({info}){
    const navigate = useNavigate();
    const category = ["패션, 뷰티","식품","생필품","취미, 반려","유아동"];
    let categoryNumber = info.category;
    let categoryImg;

    if(category[categoryNumber] === "패션, 뷰티"){
        categoryImg = FashionIcon;
    }
    if(category[categoryNumber] === "식품"){
        categoryImg = FoodIcon;
    }
    if(category[categoryNumber] === "생필품"){
        categoryImg = NecessityIcon;
    }
    if(category[categoryNumber] === "취미, 반려"){
        categoryImg = HobbiesIcon;
    }
    if(category[categoryNumber] === "유아동"){
        categoryImg = BabiesIcon;
    }

    
    function handleGetId (e){
        navigate('/detail', {state : {cardId : e.currentTarget.id }})
    }

    
    return (
        <Section>
            <CardWrap id={info._id} onClick={(e) => handleGetId(e) }>
                    <Card>
                        {
                            info.image
                            ? <CardPhoto><img src={`${ REACT_APP_API_URL }/post/image/${info.image}/`} alt='card main img'/></CardPhoto>
                            : <CardPhoto image = ""><img src={NullImage} alt='card main img'/></CardPhoto>
                        }
                        <CardCategoryWrap>
                            <CardCategoryPhoto>
                                <img src ={categoryImg} alt='category icon'/>
                            </CardCategoryPhoto>
                            <CardCategory>{category[categoryNumber]}</CardCategory>
                        </CardCategoryWrap>
                        <CardTitle>
                            <h3>
                            {info.title}
                            </h3>
                        </CardTitle>
                        <CardContent>
                            <p>
                                {info.post_content}
                            </p>
                        </CardContent>
                        <CardLocation>
                            <img src ={LocationIcon} alt='location icon'/>
                            <p>
                                {info.post_location}
                            </p>
                        </CardLocation>
                        <IsValid>
                            {
                                info.isvalid === true ? <p>모집중이에요!</p> : <p>모집완료 되었어요!</p>
                            }
                        </IsValid>
                    </Card>
                </CardWrap>
        </Section>
    )
}

export default Cards;