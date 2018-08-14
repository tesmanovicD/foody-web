const SET_EMPLOYEE = 'SET_EMPLOYEE'
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'

const initialState = {
	employee: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_EMPLOYEE:
			return {
				employee: action.payload.employee
			}
		case DELETE_EMPLOYEE:
		return {
			...state,
			employee: state.employee.filter(e => e.id !== action.payload.id)
		}
		default:
			return state
	}
}