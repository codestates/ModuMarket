import React from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';



const Auth = () => {
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
    return (
        <div>
            { token() }
        </div>
    );
};
export default Auth;