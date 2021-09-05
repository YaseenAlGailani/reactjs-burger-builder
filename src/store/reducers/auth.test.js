import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes'

describe('Authentication Reducer', () => {
    it('Should save token upon auhentication success', () => {
        let state = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }
        expect(authReducer(state, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 123,
            idToken: 456
        })).toEqual({
            ...state,
            userId: 123,
            token: 456
        });
    })
})