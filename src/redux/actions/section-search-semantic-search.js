import { postWithToken } from '../../service/shell-server';

// define action types
const FIND_SEMANTICALLY_SIMILAR_POSTS = 'FIND_SEMANTICALLY_SIMILAR_POSTS'
const SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_LOADING = 'SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_LOADING'
const SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_ERROR = 'SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_ERROR'
const SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_DATA = 'SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_DATA'

// define actions
export const findSemanticallySimilarPosts = (payload) => (
    (dispatch) => {
        dispatch(setLoading())

        console.log('==');
        console.log(payload.data.query)
        console.log(localStorage.getItem('token'))

        postWithToken(
            '/search/find-tag',
            {
                tag: payload.data.query
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
    type: 'SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_LOADING',
    data: {
        status: 'loading'
    }
})

const setError = (errorMessage) => ({
    type: 'SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_ERROR',
    data: {
        status: 'error',
        message: errorMessage
    }
})

const setData = (duplicatePost) => ({
    type: 'SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_DATA',
    data: duplicatePost
})

export const types = {
    FIND_SEMANTICALLY_SIMILAR_POSTS,
    SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_LOADING,
    SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_ERROR,
    SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_DATA
}
