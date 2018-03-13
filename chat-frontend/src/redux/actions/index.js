import { SET_USER } from '../constants/actionType';

export const setUser = function (data) {

    return {

        type: SET_USER,
        payload: data,
    }

}