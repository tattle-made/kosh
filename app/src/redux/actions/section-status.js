const generateData = (status, message) => ({
    visible: true,
    status,
    message
})

// define action types
const SET_APP_STATUS_LOADING = 'SET_APP_STATUS_LOADING';
const SET_APP_STATUS_MESSAGE = 'SET_APP_STATUS_MESSAGE';
const SET_APP_STATUS_ERROR = 'SET_APP_STATUS_ERROR';
const RESET_APP_STATUS = 'RESET_APP_STATUS';

// define actions
export const setAppStatusLoading = (msg) => ({
    type: SET_APP_STATUS_LOADING,
    data: generateData('loading', msg)
})

export const setAppStatusMessage = (msg) => ({
    type: SET_APP_STATUS_MESSAGE,
    data: generateData('message', msg)
})

export const setAppStatusError = (msg) => ({
    type: SET_APP_STATUS_ERROR,
    data: generateData('error', msg)
})

export const resetAppStatus = () => ({
    type: RESET_APP_STATUS,
    data : {
        visible : false
    }
})
export const types = {
    SET_APP_STATUS_LOADING,
    SET_APP_STATUS_MESSAGE,
    SET_APP_STATUS_ERROR,
    RESET_APP_STATUS
}