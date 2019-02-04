import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8888/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenShopping'),
    }
});

export default instance;