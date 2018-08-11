const SET_CUSTOMERS = 'SET_EMPLOYEE'


const initialState = {
	employee: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_CUSTOMERS:
			return {
				employee: action.payload.employee
			}
		default:
			return state
	}
}