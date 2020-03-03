import { types } from '../actions/section-search-fact-checked-stories';

const {
    FIND_SIMILAR_FACT_CHECKED_STORIES,
    SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING,
    SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR,
    SET_SIMILAR_FACT_CHECKED_STORIES_DATA,
    RESET_SIMILAR_FACT_CHECKED_STORIES
} = types;

const initialState = {
    status: 'default'
}

const sectionStatusFactCheckedStories = (state=initialState, action) => {
    switch(action.type){
        case FIND_SIMILAR_FACT_CHECKED_STORIES:
            return state;
        case SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_LOADING:
            return action.data;
        case SET_SIMILAR_FACT_CHECKED_STORIES_STATUS_ERROR:
            return action.data;
        case SET_SIMILAR_FACT_CHECKED_STORIES_DATA:
            return action.data;
        case RESET_SIMILAR_FACT_CHECKED_STORIES : 
            return initialState;
        default:
            return state;
    }
}

export default sectionStatusFactCheckedStories