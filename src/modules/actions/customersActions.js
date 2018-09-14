import api from '../../utils/api'

function getAllCustomers() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/customers')
            .then(customers => {
                dispatch({ type: 'SET_CUSTOMERS', payload: {customers}})
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

function getSingleCustomer(id) {
    return new Promise((resolve, reject) => {
        api.get(`/customers/${id}`)
        .then(customer => {
            resolve(...customer)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function addCustomer(customer) {
    return new Promise((resolve, reject) => {
        api.post('/customers/add', customer)
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

function deleteCustomer(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.delete(`/customers/delete/${id}`)
            .then(() => {
                dispatch(getAllCustomers())
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function editCustomer(id, customer) {
    return new Promise((resolve, reject) => {
        api.put('/customers/edit', {id, ...customer})
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

export default {
    getAllCustomers,
    getSingleCustomer,
    addCustomer,
    deleteCustomer,
    editCustomer,
}