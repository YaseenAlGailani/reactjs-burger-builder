import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import './index.css';

const logger = (storeAPI)=>(next)=>(action)=>{
  console.log('State from Middleware: ',storeAPI.getState());
  return next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewareEnhancer = applyMiddleware(logger, thunk);
const rootReducer = combineReducers({ burgerBuilder: burgerBuilderReducer, order: orderReducer, auth: authReducer});



const store = createStore(rootReducer, composeEnhancers(middlewareEnhancer));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
