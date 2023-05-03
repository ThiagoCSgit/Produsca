import axios from 'axios';

const route = axios.create({
    baseURL: 'https://edu176.bsite.net/consultas/'
})

export default route