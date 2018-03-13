import userRed from './userReducer';
import chatRed from './chatReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({ userRed ,chatRed});

export default rootReducer;