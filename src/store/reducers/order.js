import * as actionTypes from '../actions/actionTypes';


const initState = {
    order: [],
    loading: false
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.PUSH_ORDER_SUCCESS:
            console.log('[PUSH_ORDER_SUCCESS]: complete');
            return {
                ...state,
                order: state.order.concat(action.order),
                loading: false
            }
        case actionTypes.PUSH_ORDER_FAIL:
            console.error(action.error);
            return {
                ...state,
                loading:false
            }
            default: {
                return state;
            }
    }
}