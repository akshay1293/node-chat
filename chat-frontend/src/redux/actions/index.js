import { SET_USER, APPEND_MESSAGE, SET_CONNECTION, CREATE_CONVERSATION } from '../constants/actionType';

export const setUser = function (data) {

    return {

        type: SET_USER,
        payload: data,
    }

}

export const appendMessage = function (data) {

    return {

        type: APPEND_MESSAGE,
        payload: data
    }
}

export const setConnection = function (data) {

    return {
        type: SET_CONNECTION,
        payload: data
    }
}

export const createConversation = function (data) {

    return {

        type: CREATE_CONVERSATION,
        payload: data,
    }
}





