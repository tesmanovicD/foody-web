const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_USER = 'LOGOUT_USER'

const initialState = {
	loggedIn: localStorage.getItem("loggedIn") ? true : false,
	userInfo: localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : "",
}

export default (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				userInfo: action.payload.userInfo
			}
		case LOGOUT_USER:
			return {
				...state,
				loggedIn: false,
				userInfo: ''
			}
		default:
			return state
	}
}