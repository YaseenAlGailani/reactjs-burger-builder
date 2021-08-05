import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as keys from '../../apiKeys';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}


const authFail = () => {
    return { 
        type: actionTypes.AUTH_FAIL
    }
}

export const auth = (email, password) => {
    console.log('[Credentialls]: ', email, password); 
    const data = {
        email:email,
        password:password,
        returnSecureToken: true
    };
    return dispatch => {
        dispatch(authStart());
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+keys.googleApiKey,data)
        .then(response =>{
            console.log(response)
            dispatch(authSuccess(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(authFail())
        })
    }
}
