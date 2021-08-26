import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token);
    }

    render() {
        const orders = this.props.loading ? <Spinner /> :
                this.props.orders.map((order) => {
                    return <Order ingredients={order.ingredients} price={order.price} key={order.id} />
                })
        return <div>{orders}</div>
    }
}

export default connect(
    state => {
        return {
            orders: state.order.orders,
            loading: state.order.loading,
            token:state.auth.token
        }
    },
    dispatch => {
        return {
            fetchOrders: (token) => { dispatch(actions.fetchOrders(token)) }
        }
    })(withErrorHandler(Orders, axios));