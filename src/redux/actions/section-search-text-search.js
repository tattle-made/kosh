import Axios from 'axios';
import { setAppStatusLoading, setAppStatusMessage, setAppStatusError } from './section-status';
import Promise from 'bluebird';
import { postWithToken } from '../../service/shell-server';

// define action types
const FIND_MATCHING_TEXT = 'FIND_MATCHING_TEXT'
const SET_SEARCH_MATCHING_TEXT_STATUS_LOADING = 'SET_SEARCH_MATCHING_TEXT_STATUS_LOADING'
const SET_SEARCH_MATCHING_TEXT_STATUS_ERROR = 'SET_SEARCH_MATCHING_TEXT_STATUS_ERROR'
const SET_SEARCH_MATCHING_TEXT_STATUS_DATA = 'SET_SEARCH_MATCHING_TEXT_STATUS_DATA'

// define actions
export const findMatchingText = (payload) => (
    (dispatch) => {
        dispatch(setLoading())

        console.log('==');
        console.log(payload.data.query)
        console.log(localStorage.getItem('token'))

        postWithToken(
            '/search/find-text-in-image',
            {
                text: payload.data.query
            },
            localStorage.getItem('token')
        )
        .then((result) => {
            console.log(result)
            dispatch(setData(result.data))})
        .catch((err)=> {
            console.log(err);
            dispatch(setError('Error Finding Matches'));
        })
    }
)

const setLoading = () => ({
    type: 'SET_SEARCH_MATCHING_TEXT_STATUS_LOADING',
    data: {
        status: 'loading'
    }
})

const setError = (errorMessage) => ({
    type: 'SET_SEARCH_MATCHING_TEXT_STATUS_ERROR',
    data: {
        status: 'error',
        message: errorMessage
    }
})

const setData = (duplicatePost) => ({
    type: 'SET_SEARCH_MATCHING_TEXT_STATUS_DATA',
    data: duplicatePost
})

export const types = {
    FIND_MATCHING_TEXT,
    SET_SEARCH_MATCHING_TEXT_STATUS_LOADING,
    SET_SEARCH_MATCHING_TEXT_STATUS_ERROR,
    SET_SEARCH_MATCHING_TEXT_STATUS_DATA
}
