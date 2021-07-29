import * as actionTypes from './actionTypes'
import axiosOrder from '../../axios-orders';


const pushOrderSuccess = (response, orderData) => {
    return {
        type:actionTypes.PUSH_ORDER_SUCCESS,
        orderId:response.name,
        orderData: orderData,
    }
}

const pushOrderFail = (error) => {
    return {
        type:actionTypes.PUSH_ORDER_FAIL,
        error:error
    }
}

const pushOrderStart = () => {
    return {
        type:actionTypes.PUSH_ORDER_START
    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const pushOrder = (orderData) => {
    return dispatch => {
        dispatch(pushOrderStart());
        axiosOrder.post('/orders.json', orderData)
            .then(response => {
                dispatch(pushOrderSuccess(response.data, orderData))
            }).catch(error => {
                dispatch(pushOrderFail(error));
            });
    }
}