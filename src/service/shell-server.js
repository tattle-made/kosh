import axios from 'axios'
const URL = 'http://localhost:8080/api';

const get = (endpoint, token)=>{
    return axios.get(
        `${URL}${endpoint}`,
        {
          headers: {
            token
          }
        }
      )
}

const post = (endpoint, payload)=>{
    return axios.post(`${URL}${endpoint}`, payload)
    .catch((err) => console.log('ERROR IN API CALL ',err));
}

export {
    get,
    post
}