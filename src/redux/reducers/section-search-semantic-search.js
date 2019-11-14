import { types } from '../actions/section-search-semantic-search';

const {
    FIND_SEMANTICALLY_SIMILAR_POSTS,
    SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_LOADING,
    SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_ERROR,
    SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_DATA
} = types;

const initialState = {
    status: 'default'
}

const sectionSearchSemanticSearch = (state=initialState, action) => {
    switch(action.type){
        case FIND_SEMANTICALLY_SIMILAR_POSTS:
            return state;
        case SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_LOADING:
            return action.data;
        case SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_ERROR:
            return action.data;
        case SET_SEARCH_SEMANTICALLY_SIMILAR_STATUS_DATA:
            return action.data;
        default:
            return state;
    }
}

export default sectionSearchSemanticSearch