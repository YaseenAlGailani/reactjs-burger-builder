import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends React.Component {

        componentDidMount() {
            this.props.onLogout();
        }

        render() {
            return <Redirect to="/" />

        }
    }

export default connect(null,
    dispatch => {
        return {
            onLogout: () => {dispatch(actions.logout())}
        }
    }
    )(Logout);