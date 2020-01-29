import axios from 'axios'
import { ARCHIVE_SERVER_PATH } from '../config';

const API_URL = `${ARCHIVE_SERVER_PATH}/api`;
const SOCKET_URL = `${ARCHIVE_SERVER_PATH}/`;

const get = (endpoint, token)=>{
    return axios.get(
        `${API_URL}${endpoint}`,
        {
          headers: {
            token
          }
        }
      )
}

const post = (endpoint, payload)=>{
    return axios.post(`${API_URL}${endpoint}`, payload)
    .catch((err) => console.log('ERROR IN API CALL ',err));
}

const postWithToken = (endpoint, payload, token)=>{
  return axios.post(`${API_URL}${endpoint}`, 
    payload,
    {
      headers: {token}
    }
    )
  .catch((err) => console.log('ERROR IN API CALL ',err));
}

export {
  get,
  post,
  postWithToken,
  API_URL,
  SOCKET_URL
}