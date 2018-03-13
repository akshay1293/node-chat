import { SET_USER } from '../constants/actionType';

const INITIAL_STATE = { id: null, email: null, handle: null };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_USER:
            return { ...state, id: action.payload.id, email: action.payload.email, handle: action.payload.handle }
        default:
            return { ...state }
    }
}