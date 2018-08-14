import api from '../../utils/api';

function getAllOrders() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/orderPayments')
            .then(orders => {
                dispatch({ type: 'SET_ORDERS', payload: {orders} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export default {
    getAllOrders
}