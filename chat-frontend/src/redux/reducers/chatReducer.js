import { APPEND_MESSAGE, SET_CONNECTION } from '../constants/actionType';

const INITIAL_STATE = { messages: [], connection: { to: null, from: null } };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_CONNECTION:
            return { ...state, connection: { to: action.payload.to, from: action.payload.from } }
        case APPEND_MESSAGE:
            return { ...state, messages: state.messages.concat(action.payload) }
        default:
            return { ...state }
    }
}