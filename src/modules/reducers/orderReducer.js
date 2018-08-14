const SET_ORDER = 'SET_ORDER'


const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDER:
            return {
                orders: action.payload.orders
            }
        default:
            return state
    }
}