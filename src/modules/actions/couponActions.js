import api from '../../utils/api'

function getAllCoupons() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/coupons')
            .then(coupons => {
                dispatch({ type: 'SET_COUPONS', payload: {coupons} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function getSingleCoupon(id) {
    return new Promise((resolve, reject) => {
        api.get(`/coupons/${id}`)
        .then(coupon => {
            resolve(...coupon)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function deleteCoupon(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.delete(`/coupons/delete/${id}`)
            .then(() => {
                dispatch({ type: 'DELETE_COUPON', payload: {id} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function editCoupon(id, coupon) {
    return new Promise((resolve, reject) => {
        api.put('/coupons/edit', {id, ...coupon})
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

function addCoupon(coupon) {
    return new Promise((resolve, reject) => {
        api.post('/coupons/add', coupon)
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

export default {
    getAllCoupons,
    getSingleCoupon,
    deleteCoupon,
    editCoupon,
    addCoupon
}