import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mercurio-api.herokuapp.com/api/'
    //baseURL: 'http://127.0.0.1:8000/api/'
})

export default api;