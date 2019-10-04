import { POST_DELETE, POSTS, POST_UPLOAD, SEARCH } from './types';
import axios from 'axios';
import { error, triggerLoading } from './utils';
import { toggleAuthentication } from './auth';
import {API_URL} from '../../service/shell-server'

const postDelete = (id, page) => {
  const url = `${API_URL}/posts/delete/${id}`;
  const token = localStorage.getItem('token');
  const request = axios.delete(url, {
    headers: {
      token
    }
  });

  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: POST_DELETE,
          payload: res.data
        });
        dispatch(fetchPosts(1));
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const postByTime = (page, startDate, endDate) => {
  const url = `${API_URL}/postByTime/${page}`;

  const token = localStorage.getItem('token');
  const time = {
    startDate,
    endDate
  };
  const request = axios.post(url, time, {
    headers: {
      token
    }
  });

  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: POSTS,
          payload: res.data
        });
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const postByTimeAndUsers = (page, users_id, startDate, endDate) => {
  const url = `${API_URL}/postByTimeAndUsers/${page}`;

  const token = localStorage.getItem('token');
  const data = {
    users_id,
    startDate,
    endDate
  };
  const request = axios.post(url, data, {
    headers: {
      token
    }
  });

  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: POSTS,
          payload: res.data
        });
      })
      .catch(err => {
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const fetchPosts = page => {
  if (page === undefined) {
    page = 1;
  }

  const url = `${API_URL}/posts/${page}`;
  const token = localStorage.getItem('token');
  const request = axios.get(url, {
    headers: {
      token
    }
  });
  
  return dispatch => {
    dispatch(triggerLoading(true))
    request
      .then(res => {
        dispatch({
          type: POSTS,
          payload: res.data
        });
        dispatch(triggerLoading(false))
      })
      .catch(err => {
        dispatch(toggleAuthentication(false));

        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const uploadToS3 = (file, fileName, fileType) => {
  const token = localStorage.getItem('token');
  return dispatch =>
    axios
      .post(
        `${API_URL}/uploadToS3`,
        {
          fileName: fileName,
          fileType: fileType
        },
        {
          headers: {
            token
          }
        }
      )
      .then(response => {
        const info = response.data.data.info;
        const signedRequest = info.signedRequest;
        const url = info.url;
        const success = response.data.success;

        const options = {
          headers: {
            'Content-Type': fileType
          }
        };

        const data = {
          success,
          url
        };
        axios.put(signedRequest, file, options).then(result => {
          dispatch({
            type: POST_UPLOAD,
            payload: data
          });
        });
      })
      .catch(err => {
        dispatch(error(err));
      });
};

const search = (params) => {
  const SEARCH_API_URL = "http://3.130.147.43:7000/find_duplicate"
  

  return dispatch => {
    axios.post(SEARCH_API_URL, {
      text: params.search_term
    })
    .then(res => {
      console.log('==search response==')
      console.log(res);
      dispatch({
        type: SEARCH,
        payload: res.data
      });
      dispatch(triggerLoading(false));
    })
    .catch(err => {
      if (err.response === undefined) {
        dispatch(error('Network Error'));
      } else {
        dispatch(error(err.response.data));
      }
    });
  };
};

export {
  postByTime,
  postByTimeAndUsers,
  postDelete,
  fetchPosts,
  uploadToS3,
  search
};
