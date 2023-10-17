import axios from 'axios';

const jwtToken = localStorage.getItem('jwtToken');

if (jwtToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

export default axios;
