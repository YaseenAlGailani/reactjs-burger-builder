import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/burgerBuilder';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const preloadedState = {
  ingredients: {
    cheese: 0,
    meat: 0,
    salad: 0,
    mushroom: 0
  },
  totalPrice: 4
}

const logger = (storeAPI)=>(next)=>(action)=>{
  console.log('State from Middleware: ',storeAPI.getState());
  return next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewareEnhancer = applyMiddleware(logger);

console.log('type of middlewareEnhancer: ',typeof(middlewareEnhancer))

const store = createStore(reducer, preloadedState, composeEnhancers(middlewareEnhancer));

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
