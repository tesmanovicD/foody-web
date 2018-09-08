const SET_ORDERS = 'SET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDERS:
            return {
                orders: action.payload.orders
            }
        case UPDATE_ORDER: 
            return {
                orders: state.orders.map(order => {
                    if (order.id === action.payload.id) {
                        return {
                            ...order,
                            status: 'Ready'
                        }
                    }

                    return order
                })
            }
        case DELETE_ORDER:
            return {
                orders: state.orders.filter(order => order.id !== action.payload.id)
            }
        default:
            return state
    }
}