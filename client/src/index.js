import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';


/* add trace in __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }):
   to enable action tracing to know which part of code dispatched an action */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
