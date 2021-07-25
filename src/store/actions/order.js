import * as actionTypes from './actionTypes'
import axiosOrder from '../../axios-orders';


const pushOrderSuccess = (message, order) => {
    return {
        type:actionTypes.PUSH_ORDER_SUCCESS,
        order: order,
        successMessage: message
    }
}

const pushOrderFail = (error) => {
    return {
        type:actionTypes.PUSH_ORDER_FAIL,
        error:error
    }
}

export const pushOrder = (order) => {
    return dispatch => {
        axiosOrder.post('/orders.json', order)
            .then(response => {
                dispatch(pushOrderSuccess(response, order))
            }).catch(error => {
                dispatch(pushOrderFail(error));
            });
    }
}