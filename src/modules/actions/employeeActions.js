import api from '../../utils/api'

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

function getSingleEmployee(id) {
    return new Promise((resolve, reject) => {
        api.get(`/employee/${id}`)
        .then(employee => {
            resolve(...employee)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function deleteEmployee(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.delete(`/employee/delete/${id}`)
            .then(() => {
                dispatch({ type: 'DELETE_EMPLOYEE', payload: {id} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function editEmployee(id, employee) {
    return new Promise((resolve, reject) => {
        api.put('/employee/edit', {id, ...employee})
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

function addEmployee(employee) {
    return new Promise((resolve, reject) => {
        api.post('/employee/add', employee)
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

export default {
    getAllEmployee,
    getSingleEmployee,
    deleteEmployee,
    editEmployee,
    addEmployee
}