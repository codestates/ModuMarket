import React from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';



const Auth = ({social}) => {
    console.log(social)
    if(social === 'kakao'){
        const REST_API_KEY = "582364e7342bc8ebe03c9fb7bfd980a0";
        const REDIRECT_URI = "http://localhost:3000/sign/kakao/callback";
        const code = new URL(window.location.href).searchParams.get("code");
        const token = () => {
            axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}})
            .then((data) => {
                console.log(data.data.access_token)
                axios.get(`${REACT_APP_API_URL}/sign/kakao/callback`,
                {headers: {"authorization": `Bearer ${data.data.access_token}`}})
                .then(item => {
                    console.log(item.data.id)
                    console.log(item.data.email)
                })
            })
            // 추가정보로 name, age, area_name 받아서 다시 서버로 보내주세용 
    
        }
        token()
    } else if(social === 'gitgub') {
        const code = new URL(window.location.href).searchParams.get("code");
        const token = () => {
            console.log(code)
            axios.get(`${REACT_APP_API_URL}/sign/github/callback`,
            {params: {code: code}}, 
            {withCredentials: true })
            .then(data => console.log(data.data)) //엑세스토큰이 들어오면 로그인처리, 안들어오면 추가정보입력 받긔용

        }
        token();
    }


    return (
        <div>
            {  }
        </div>
    );
};
export default Auth;