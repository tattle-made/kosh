import Axios from 'axios';
import { setAppStatusLoading, setAppStatusMessage, setAppStatusError } from './section-status';
import Promise from 'bluebird';

// define action types
const FIND_DUPLICATE_IMAGES = 'FIND_DUPLICATE_IMAGES'
const FIND_DUPLICATE_VIDEOS = 'FIND_DUPLICATE_VIDEOS'
const SET_SEARCH_DUPLICATE_STATUS_LOADING = 'SET_SEARCH_DUPLICATE_STATUS_LOADING'
const SET_SEARCH_DUPLICATE_STATUS_ERROR = 'SET_SEARCH_DUPLICATE_STATUS_ERROR'
const SET_SEARCH_DUPLICATE_STATUS_DATA = 'SET_SEARCH_DUPLICATE_STATUS_DATA'

// define actions
export const findDuplicateImages = () => (
    (dispatch) => {
        dispatch(setLoading())
        Promise.delay(2000).then(()=>{
            //return Promise.reject('Error finding duplicate')
            dispatch(setData({
                status: 'data',
                type: 'image',
                mediaUrl: 'https://tattle-media.s3.amazonaws.com/post_image_1.jpeg'
            }))
        })
        .catch((err)=> {
            console.log(err);
            dispatch(setError('Error Loading Duplicates'));
        })
    }
)

const setLoading = () => ({
    type: 'SET_SEARCH_DUPLICATE_STATUS_LOADING',
    data: {
        status: 'loading'
    }
})

const setError = (errorMessage) => ({
    type: 'SET_SEARCH_DUPLICATE_STATUS_ERROR',
    data: {
        status: 'error',
        message: errorMessage
    }
})

const setData = (duplicatePost) => ({
    type: 'SET_SEARCH_DUPLICATE_STATUS_DATA',
    data: duplicatePost
})

export const types = {
    FIND_DUPLICATE_IMAGES,
    FIND_DUPLICATE_VIDEOS,
    SET_SEARCH_DUPLICATE_STATUS_LOADING,
    SET_SEARCH_DUPLICATE_STATUS_ERROR,
    SET_SEARCH_DUPLICATE_STATUS_DATA
}
