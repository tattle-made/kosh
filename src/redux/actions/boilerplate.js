import Axios from 'axios';
import { setAppStatusLoading, setAppStatusMessage, setAppStatusError } from '../section-status';
import Promise from 'bluebird';

// define action types
const ACTION_ONE_NAME = 'ACTION_ONE_NAME'
const ACTION_TWO_NAME = 'ACTION_TWO_NAME'

// define actions
export const findDuplicateImages = () => (
    (dispatch) => {
        dispatch(setAppStatusLoading('Making network requests'))
        Promise.delay(5000).then(()=>{
            Axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then((res) => {
                console.log(res);
                dispatch(setAppStatusMessage('Results fetched successfully'))
            })
        })
        .catch((err)=> {
            console.log(err);
            //dispatch error
            dispatch(setAppStatusError('Error fetching results'))
        })
    }
)

export const types = {
    ACTION_ONE_NAME,
    ACTION_TWO_NAME,
}
