import * as actionTypes from './actionTypes';
import axios from '../../axios-orderes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json?auth='+ token, orderData)
            .then(res => {
                ;
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
                console.log(res)
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
                console.log(err)
            });
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios
            .get('/orders.json?auth='+ token)
            .then(res => {
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({ ...res.data[key], id: key });
                }
                dispatch(fetchOrdersSuccess(fetchedData));
                // console.log(res)
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
                // console.log(err)
            });
    }
}
