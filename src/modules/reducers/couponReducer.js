const SET_COUPONS = 'SET_COUPONS'
const ADD_COUPON = 'ADD_COUPON'
const DELETE_COUPON = 'DELETE_COUPON'

const initialState = {
    coupons: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_COUPONS:
            return {
                coupons: action.payload.coupons
            }
        case ADD_COUPON:
        console.log(action.payload.coupon)
        console.log(action.payload)

            return {
                coupons: [...state.coupons, action.payload.coupon]
            }
        case DELETE_COUPON:
            return {
                ...state,
                coupons: state.coupons.filter(c => c.id !== action.payload.id)
            }
        default:
            return state
    }
}