import api from '../../utils/api';


function authenticateUser(username, password) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.post('/employee/authenticate', {username, password})
            .then((userInfo) => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: {userInfo} })
                localStorage.setItem('loggedIn', true)
                localStorage.setItem('userInfo', userInfo)
                resolve()
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

function logoutUser() {
    return dispatch => {
        dispatch({ type: 'LOGOUT_USER '})
        localStorage.clear('loggedIn')
        localStorage.clear('userInfo')
    }
}

export default {
    authenticateUser,
    logoutUser,
}
