import { SET_USER } from '../constants/actionType';

const INITIAL_STATE = { id: null, email: null, handle: null, gender: null, status: null };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_USER:
            return { ...state, id: action.payload.id, email: action.payload.email, handle: action.payload.handle, gender: action.payload.gender, status: action.payload.status }
        default:
            return { ...state }
    }
}