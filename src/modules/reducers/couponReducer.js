const SET_COUPONS = 'SET_COUPONS'

const initialState = {
    coupons: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_COUPONS:
            return {
                coupons: action.payload.coupons
            }
        default:
            return state
    }
}