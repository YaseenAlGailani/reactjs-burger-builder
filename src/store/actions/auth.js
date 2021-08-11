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
        error:error
    }
}

export const auth = (isSignup, email, password) => {
    console.log('[Credentialls]: ', email, password); 
    const data = {
        email:email,
        password:password,
        returnSecureToken: true
    };

    const url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.googleApiKey : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.googleApiKey ;
    return dispatch => {
        dispatch(authStart());
        axios.post(url ,data)
        .then(response =>{
            console.log(response)
            dispatch(authSuccess(response.data.localId, response.data.idToken));
        }).catch(error => {
            console.log('[AUTH_FAIL]: ',error);
            dispatch(authFail(error))
        })
    }
}
