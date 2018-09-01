import api from '../../utils/api';

function getAllOrders() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/orderPayments')
            .then(orders => {
                console.log(orders)
                dispatch({ type: 'SET_ORDERS', payload: {orders} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function getOrder(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get(`/orderPayments/${id}`)
            .then(order => {
                // dispatch({ type: 'SET_ORDER', payload: {orders} })
                resolve(order[0])
            })
            .catch(err => reject(err))
        })
    }
}

export default {
    getAllOrders,
    getOrder
}