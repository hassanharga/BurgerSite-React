import React from "react";
import { connect } from 'react-redux';


import axios from '../../axios-orderes';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {

    componentDidMount() {
        this.props.onfetchOrders(this.props.token);
        //     axios
        //         .get("orders.json")
        //         .then(res => {
        //             const fetchedData = [];
        //             for (let key in res.data) {
        //                 fetchedData.push({ ...res.data[key], id: key });
        //             }
        //             this.setState({ orders: fetchedData, loading: false });
        //         })
        //         .catch(err => {
        //             this.setState({ loading: false });
        //         });
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
            
        };
        return (
            <div>

                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchOrders: (token) => { dispatch(actions.fetchOrders(token)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));