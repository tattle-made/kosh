import { Duplicate } from '../actions/section-search';

const { types } = Duplicate;
const {
    FIND_DUPLICATE_IMAGES,
    FIND_DUPLICATE_VIDEOS,
    SET_SEARCH_DUPLICATE_STATUS_LOADING,
    SET_SEARCH_DUPLICATE_STATUS_ERROR,
    SET_SEARCH_DUPLICATE_STATUS_DATA,
    RESET_SEARCH_DUPLICATE,
} = types;

const initialState = {
    status: 'default'
}

const sectionStatusDuplicate = (state=initialState, action) => {
    switch(action.type){
        case FIND_DUPLICATE_IMAGES:
            return state;
        case FIND_DUPLICATE_VIDEOS:
            return state;
        case SET_SEARCH_DUPLICATE_STATUS_LOADING:
            return action.data;
        case SET_SEARCH_DUPLICATE_STATUS_ERROR:
            return action.data;
        case SET_SEARCH_DUPLICATE_STATUS_DATA:
            return action.data;
        case RESET_SEARCH_DUPLICATE:
            return initialState;
        default:
            return state;
    }
}

export default sectionStatusDuplicate