import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

ReactDOM.render(

    <BrowserRouter history={customHistory}>
        <App />
    </BrowserRouter>

    , document.getElementById('root'));
registerServiceWorker();
