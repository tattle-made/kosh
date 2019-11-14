import Axios from 'axios';
import { setAppStatusLoading, setAppStatusMessage, setAppStatusError } from './section-status';
import Promise from 'bluebird';
import { postWithToken } from '../../service/shell-server';

// define action types
const FIND_DUPLICATE_IMAGES = 'FIND_DUPLICATE_IMAGES'
const FIND_DUPLICATE_VIDEOS = 'FIND_DUPLICATE_VIDEOS'
const SET_SEARCH_DUPLICATE_STATUS_LOADING = 'SET_SEARCH_DUPLICATE_STATUS_LOADING'
const SET_SEARCH_DUPLICATE_STATUS_ERROR = 'SET_SEARCH_DUPLICATE_STATUS_ERROR'
const SET_SEARCH_DUPLICATE_STATUS_DATA = 'SET_SEARCH_DUPLICATE_STATUS_DATA'
const RESET_SEARCH_DUPLICATE = 'RESET_SEARCH_DUPLICATE'

// define actions
export const findDuplicateImages = (payload) => (
    (dispatch) => {
        dispatch(setLoading())

        console.log('==');
        console.log(payload.data.query)
        console.log(localStorage.getItem('token'))

        postWithToken(
            '/search/duplicate',
            {
                url: payload.data.query
            },
            localStorage.getItem('token')
        )
        .then((result) => {
            console.log(result)
            dispatch(setData(result.data))})
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

export const reset = () => ({
    type: RESET_SEARCH_DUPLICATE
})

export const types = {
    FIND_DUPLICATE_IMAGES,
    FIND_DUPLICATE_VIDEOS,
    SET_SEARCH_DUPLICATE_STATUS_LOADING,
    SET_SEARCH_DUPLICATE_STATUS_ERROR,
    SET_SEARCH_DUPLICATE_STATUS_DATA,
    RESET_SEARCH_DUPLICATE
}
