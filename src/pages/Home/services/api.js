import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://localhost:5001/api'
});

export default Api;
