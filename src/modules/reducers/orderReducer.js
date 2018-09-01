const SET_ORDERS = 'SET_ORDERS'


const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDERS:
            return {
                orders: action.payload.orders
            }
        default:
            return state
    }
}