import Axios from 'axios';
import Promise from 'bluebird';

// define action types
const FIND_SIMILAR_FACT_CHECKED_STORIES = 'FIND_SIMILAR_FACT_CHECKED_STORIES'
const SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING = 'SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING'
const SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR = 'SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR'
const SET_SIMILAR_FACT_CHECKED_STORIES_DATA = 'SET_SIMILAR_FACT_CHECKED_STORIES_DATA'

// define actions
export const findSimilarFactCheckedStories = () => (
    (dispatch) => {
        dispatch(setLoading())
        Promise.delay(1500).then(()=>{
            dispatch(setData({
                status:'data',
                urls : [
                    {
                        title: 'Sample Title of First Url',
                        url : 'https://www.altnews.in/authors-wikipedia-page-vandalised-after-times-critical-cover-story-on-pm-modi/',
                        timestamp: "10th May 2019"
                    },
                    {
                        title: 'Sample Title of Second Url',
                        url : 'https://www.boomlive.in/amidst-shutdown-rumours-lakshmi-vilas-bank-files-police-complaint/',
                        timestamp: "9th May 2019"
                    },
                    {
                        title: 'Sample Title of Third Url',
                        url : 'https://www.altnews.in/authors-wikipedia-page-vandalised-after-times-critical-cover-story-on-pm-modi/',
                        timestamp: "19th March 2018"
                    }
                ]
            }))
        })
        .catch((err)=> {
            console.log(err);
            //dispatch error

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

export const types = {
    FIND_SIMILAR_FACT_CHECKED_STORIES,
    SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING,
    SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR,
    SET_SIMILAR_FACT_CHECKED_STORIES_DATA
}
