import api from '../../utils/api';

function getAllEmployee() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/employee')
            .then(employee => {
                dispatch({ type: 'SET_EMPLOYEE', payload: {employee}})
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export default {
    getAllEmployee
}