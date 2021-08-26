import * as actionTypes from './actionTypes'
import axiosOrder from '../../axios-orders';


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const pushOrderStart = () => {
    return {
        type: actionTypes.PUSH_ORDER_START
    }
}

const pushOrderSuccess = (response, orderData) => {
    return {
        type: actionTypes.PUSH_ORDER_SUCCESS,
        orderId: response.name,
        orderData: orderData,
    }
}

const pushOrderFail = (error) => {
    return {
        type: actionTypes.PUSH_ORDER_FAIL,
        error: error
    }
}



export const pushOrder = (orderData, token) => {
    return dispatch => {
        dispatch(pushOrderStart());
        axiosOrder.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(pushOrderSuccess(response.data, orderData))
            }).catch(error => {
                dispatch(pushOrderFail(error));
            });
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}
const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axiosOrder.get('/orders.json?auth=' + token)
            .then((resp) => {
                console.log('[FETCH_ORDERS]', resp.data)
                let fetchedOrders = []
                for (let key in resp.data) {
                    fetchedOrders.push({
                        id: key,
                        ...resp.data[key]
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            }).catch((error) => {
                dispatch(fetchOrderFail(error));
            });
    }
}