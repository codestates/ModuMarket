import styled from 'styled-components';

export const Section = styled.section`
    padding: 4rem 0;
    width: 100vw;
    background-color: #fff;

`
export const SectionWrap = styled.div`
    width : 100%;
    padding: 2rem 0;
`

export const CardWrap = styled.div`
    width :100%;
    display: flex;
    justify-content: center;
    
`

export const Card = styled.div`
    display: flex;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 16rem;
    height : 18rem;
    margin: 0 1rem ;
    justify-content: center;
    align-items : center;
    
`

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items : center;
    width : 100%;
    padding: 0 1rem;
`

export const ContentPhotoLaptop = styled.div`
    padding-top: 2rem;
    img{
        width : 10.69rem;
        height : 5.4rem;
    }
`
export const ContentPhotoLocationMark = styled.div`
    padding-top: 2.1rem;

    img{
        width : 3.4rem;
        height : 5.3rem;
    }
`
export const ContentPhotoCoin = styled.div`
        padding-top: 2.1rem;

    img{
        width : 6rem;
        height : 5.3rem;
    }
`

export const ContentText = styled.div`
    width : 100%;
    padding : 1rem 0;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    text-align: center;
    line-height: 1.3rem;
`