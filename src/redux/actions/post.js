import { POST_DELETE, POSTS, POST_UPLOAD } from './types';
import axios from 'axios';
import { error } from './utils';
import { toggleAuthentication } from './auth';

const postDelete = (id, page) => {
  const url = `http://localhost:8080/api/posts/delete/${id}`;
  const token = localStorage.getItem('token');
  console.log('token delete post and url', token, url);
  const request = axios.delete(url, {
    headers: {
      token
    }
  });

  return dispatch => {
    request
      .then(res => {
        console.log('res ', res);
        dispatch({
          type: POST_DELETE,
          payload: res.data
        });
        dispatch(fetchPosts(1));
      })
      .catch(err => {
        console.log('err', err);
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });

    // dispatch(triggerRefresh(refresh));
  };
};

const postByTime = (page, startDate, endDate) => {
  const url = `http://localhost:8080/api/postByTime/${page}`;
  console.log('action postybytime ', url);
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

  console.log('request posy by time', request);
  return dispatch => {
    request
      .then(res => {
        console.log('posybytime res', res.data);
        dispatch({
          type: POSTS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log('err', err);
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const postByTimeAndUsers = (page, users_id, startDate, endDate) => {
  console.log(users_id);
  const url = `http://localhost:8080/api/postByTimeAndUsers/${page}`;
  console.log('action user and time url', url);
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
  console.log(request);
  return dispatch => {
    request
      .then(res => {
        dispatch({
          type: POSTS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log('err', err);
        if (err.response === undefined) {
          dispatch(error('Network Error'));
        } else {
          dispatch(error(err.response.data));
        }
      });
  };
};

const fetchPosts = page => {
  console.log('action posts page ', page);
  if (page === undefined) {
    page = 1;
  }
  console.log('fetchposts page ', page);
  const url = `http://localhost:8080/api/posts/${page}`;
  const token = localStorage.getItem('token');
  const request = axios.get(url, {
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
        console.log(err.response);
        dispatch(toggleAuthentication(false));
        console.log('err', err);
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
        'http://localhost:8080/api/uploadToS3',
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
        const success = info.success;
        console.log('s3 file url', url);
        const options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios
          .put(signedRequest, file, options)
          .then(result => {
            console.log('Response from s3');
            return {
              type: POST_UPLOAD,
              payload: success
            };
          })
          .catch(err => {
            dispatch(error(err));
          });
      })
      .catch(err => {
        dispatch(error(err));
      });
};

export { postByTime, postByTimeAndUsers, postDelete, fetchPosts, uploadToS3 };
