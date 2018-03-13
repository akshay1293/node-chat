import { SET_USER, APPEND_MESSAGE, SET_CONNECTION } from '../constants/actionType';

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