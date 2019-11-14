import { types } from '../actions/section-search-text-search';

const {
    FIND_MATCHING_TEXT,
    SET_SEARCH_MATCHING_TEXT_STATUS_LOADING,
    SET_SEARCH_MATCHING_TEXT_STATUS_ERROR,
    SET_SEARCH_MATCHING_TEXT_STATUS_DATA,
    RESET_SEARCH_MATCHING_TEXT
} = types;

const initialState = {
    status: 'default'
}

const sectionSearchTextSearch = (state=initialState, action) => {
    switch(action.type){
        case FIND_MATCHING_TEXT:
            return state;
        case SET_SEARCH_MATCHING_TEXT_STATUS_LOADING:
            return action.data;
        case SET_SEARCH_MATCHING_TEXT_STATUS_ERROR:
            return action.data;
        case SET_SEARCH_MATCHING_TEXT_STATUS_DATA:
            return action.data;
        case RESET_SEARCH_MATCHING_TEXT:
            return initialState;
        default:
            return state;
    }
}

export default sectionSearchTextSearch