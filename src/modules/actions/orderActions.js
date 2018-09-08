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

function deleteOrder(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.delete(`/orderPayments/delete/${id}`)
            .then(() => {
                dispatch({ type: 'DELETE_ORDER', payload: {id} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function acceptOrder(id, pickupDate, customerId, orderNo) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.put(`/orderPayments/changeStatus`, {id, status: 'Ready', pickupDate})
            .then(() => {
                dispatch({ type: 'UPDATE_ORDER', payload: {id} })
                resolve()
                const data = {
                    app_id: "74723254-f9b6-4f24-bde3-5835a592f71e",
                    filters: [{field: 'tag', key: 'id', value: `${customerId}`}],
                    contents: {"en": `Your order #${orderNo} is accepted, check your orders list`}
                }
                api.post('https://onesignal.com/api/v1/notifications', data)
                .catch(err => console.warn(err))
            })
            .catch(err => reject(err))
        })
    }
}

export default {
    getAllOrders,
    getOrder,
    acceptOrder,
    deleteOrder
}