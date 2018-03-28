import { APPEND_MESSAGE, SET_CONNECTION, CREATE_CONVERSATION } from '../constants/actionType';

// messages: state.messages[state.messages.findIndex(() => { return action.payload.to })][action.payload.to].concat(action.payload) 

const INITIAL_STATE = { messages: {}, connection: { to: null, from: null } };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_CONNECTION:
            return { ...state, connection: { to: action.payload.to, from: action.payload.from } }
        case APPEND_MESSAGE:

            return {
                ...state,
                ...state.messages[action.payload.to] = [...state.messages[action.payload.to], action.payload.body]
            }
        case CREATE_CONVERSATION:

            return {
                ...state,
                ...state.messages[action.payload] = []
            }

        default:
            return { ...state }
    }
}