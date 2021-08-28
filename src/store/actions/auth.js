import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as keys from '../../apiKeys';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: idToken
    }
}


const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

const authTimeout = (expirationTime) => {
    return dispatch => {
        console.log('[EXPIREY]', expirationTime)
        setTimeout(() => {
            console.log('[SESSION TIMEOUT]')
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireyDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (isSignup, email, password) => {
    console.log('[Credentialls]: ', email, password);
    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    };

    const url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.googleApiKey : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.googleApiKey;
    return dispatch => {
        dispatch(authStart());
        axios.post(url, data)
            .then(response => {
                const expireyDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expireyDate', expireyDate);

                console.log(response)
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(authTimeout(response.data.expiresIn));
            }).catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const autoAuthenticate = () => {
    
    const expireyDate = new Date(localStorage.getItem('expireyDate'));
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    console.log('[APP]: ', expireyDate > new Date())
 
    return dispatch => {
        if (expireyDate > new Date()) {
            console.log('{TESTING}',expireyDate.getTime());
            dispatch(authSuccess(userId, token));
            dispatch(authTimeout((expireyDate.getTime() - new Date().getTime()) / 1000));
        } else {
            dispatch(logout());
        }
    }
}