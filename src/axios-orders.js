import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d8d07-default-rtdb.firebaseio.com/',
});

export default instance;