import React from 'react';
import Order from '../../components/Order/Order';
import axiosOrders from '../../axios-orders';

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        let orders = []
        axiosOrders.get('/orders.json').then((resp) => {
            console.log(Object.keys(resp.data))
            for (let key in resp.data) {
                orders.push({
                    ...resp.data[key],
                    id: key
                })
            }

            this.setState({ loading: false, orders:orders });
        }).catch((error) => {
            console.log(error.message);
            this.setState({ loading: false });
        });
    }

    render() {

        return (
            <div>
                {this.state.orders.map((order)=>{
                    return <Order ingredients={order.ingredients} price={order.price} key={order.id} />
                })}
            </div>
        )
    }
}

export default Orders;