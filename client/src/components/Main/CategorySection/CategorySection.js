import React from 'react';
import ShoppingBag from '../../../assets/shopping_bag.png'
import FoodIcon from '../../../assets/food_icon.png'
import BabiesIcon from '../../../assets/babies_icon.png'
import FashionIcon from '../../../assets/fashion_icon.png'
import HobbiesIcon from '../../../assets/hobbies_icon.png'
import NecessityIcon from '../../../assets/necessity_icon.png'
import {Section, 
        Wrap,
        ImgWrap,
        CategoryUl,
        CategoryLi,} from './styled'


function CategorySection() {
    return (
        <Section>
            <ImgWrap>
                <img src ={ShoppingBag} alt='category background'/>
            </ImgWrap>
            <Wrap>       
                <CategoryUl>
                    <CategoryLi>
                        <img src={FoodIcon} alt="category food"/>
                        <span>식품</span>
                    </CategoryLi>
                    <CategoryLi>
                        <img src={FashionIcon} alt="category fashion"/>
                        <span>패션</span>
                    </CategoryLi>
                    <CategoryLi>
                        <img src={HobbiesIcon} alt="category hobbies"/>
                        <span>취미</span>
                    </CategoryLi>
                    <CategoryLi>
                        <img src={BabiesIcon} alt="category babies"/>
                        <span>유아동</span>
                    </CategoryLi>
                    <CategoryLi>
                        <img src={NecessityIcon} alt="category necessity"/>
                        <span>생필품</span>
                    </CategoryLi>
                </CategoryUl>
            </Wrap>
        </Section>
    )
}

export default CategorySection;