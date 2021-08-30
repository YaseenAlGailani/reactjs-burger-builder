import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import loadAsyncComponent from './hoc/loadAsyncComponent/loadAsyncComponent';

function App(props) {
  useEffect(() => {
    props.autoAuthenticate();
  });

  let routes = (
    <Switch>
      <Route path='/auth' component={loadAsyncComponent(() => import('./containers/Auth/Auth'))} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={loadAsyncComponent(() => import('./containers/Checkout/Checkout'))} />
        <Route path='/orders' component={loadAsyncComponent(() => import('./containers/Orders/Orders'))} />
        <Route path='/auth' component={loadAsyncComponent(() => import('./containers/Auth/Auth'))} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

export default connect(
  state => {
    return {
      isAuthenticated: state.auth.token !== null
    }
  },
  dispatch => {
    return {
      autoAuthenticate: () => {
        dispatch(actions.autoAuthenticate())

      }
    }
  }
)(App);
