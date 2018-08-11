const SET_CUSTOMERS = 'SET_CUSTOMERS'


const initialState = {
    customers: []
}


export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CUSTOMERS:
            return {
                customers: action.payload.customers
            }
        default:
            return state
    }
}