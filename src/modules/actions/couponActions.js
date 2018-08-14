import api from '../../utils/api';

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

export default {
    getAllCoupons
}