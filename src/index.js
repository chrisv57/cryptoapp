import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './App/store';
import 'antd/dist/antd.css';
ReactDom.render(
    <Router>
    {/* Now everysingle component inside the app will have access to the store variable by putting it under the provider */}
        <Provider store={store}>
            <App /> 
        </Provider>

    </Router>,
    document.getElementById('root')
);