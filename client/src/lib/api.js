import axios from 'axios'
import { REACT_APP_API_URL } from '../config';

export const getLoginUserInfo = id => {
    axios.get(`${REACT_APP_API_URL}/login`);
}
