import axios from 'axios'
import { APP_URL } from '../config';

export const getUserInfo = id => {
    axios.get(`${APP_URL}/login`);
}
