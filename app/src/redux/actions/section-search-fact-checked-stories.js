import Axios from 'axios';
import Promise from 'bluebird';
import { postWithToken } from '../../service/shell-server';

// define action types
const FIND_SIMILAR_FACT_CHECKED_STORIES = 'FIND_SIMILAR_FACT_CHECKED_STORIES'
const SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING = 'SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING'
const SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR = 'SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR'
const SET_SIMILAR_FACT_CHECKED_STORIES_DATA = 'SET_SIMILAR_FACT_CHECKED_STORIES_DATA'
const RESET_SIMILAR_FACT_CHECKED_STORIES = 'RESET_SIMILAR_FACT_CHECKED_STORIES'

// define actions
export const findSimilarFactCheckedStories = (payload) => (
    (dispatch) => {
        dispatch(setLoading())

        // console.log('hello')
        // console.log(payload)

        postWithToken(
            '/search/duplicate-stories',
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
            dispatch(setError('Error Finding Stories'));
        })
    }
)

export const setLoading = () => ({
    type: 'SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING',
    data: {
        status: 'loading'
    }
})

export const setData = (factCheckedStories) => ({
    type: 'SET_SIMILAR_FACT_CHECKED_STORIES_DATA',
    data: factCheckedStories
})

export const setError = (errorMessage) => ({
    type: 'SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR',
    data: {
        status: 'error',
        message: errorMessage
    }
})

export const reset = () => ({
    type: RESET_SIMILAR_FACT_CHECKED_STORIES
})

export const types = {
    FIND_SIMILAR_FACT_CHECKED_STORIES,
    SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING,
    SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR,
    SET_SIMILAR_FACT_CHECKED_STORIES_DATA,
    RESET_SIMILAR_FACT_CHECKED_STORIES
}
