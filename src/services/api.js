import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mercurio-api.herokuapp.com/api/'
})

export default api;