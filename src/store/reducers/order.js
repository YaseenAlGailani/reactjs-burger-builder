import * as actionTypes from '../actions/actionTypes';


const initState = {
    orders: [],
    loading: false
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.PUSH_ORDER_START:
            console.log('[PUSH_ORDER_START]: triggered')
            return {
                ...state,
                loading: true
            }
        case actionTypes.PUSH_ORDER_SUCCESS:
            const newOrder = {
                id: action.orderId,
                ...action.orderData
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false
            }
        case actionTypes.PUSH_ORDER_FAIL:
            console.error(action.error);
            return {
                ...state,
                loading: false
            }
        default: {
            return state;
        }
    }
}