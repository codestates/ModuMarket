import React from 'react'
import FoodIcon from '../../assets/food_icon.png'
import BabiesIcon from '../../assets/babies_icon.png'
import FashionIcon from '../../assets/fashion_icon.png'
import HobbiesIcon from '../../assets/hobbies_icon.png'
import NecessityIcon from '../../assets/necessity_icon.png'
import LocationIcon from '../../assets/location_icon.png'
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

        




        return (
            <Section>
                <CardWrap>
                        <Card>
                            <CardPhoto>
                                <img src={info.image} alt='card main img'/>
                            </CardPhoto>
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
                                    {info.content}
                                </p>
                            </CardContent>
                            <CardLocation>
                                <img src ={LocationIcon} alt='location icon'/>
                                <p>
                                    {info.location}
                                </p>
                            </CardLocation>
                            <IsValid>
                                {
                                    info.isValid === true ? <p>모집중이에요!</p> : <p>모집완료 되었어요!</p>
                                }
                            </IsValid>
                        </Card>
                    </CardWrap>
            </Section>
        )
    }

export default Cards;