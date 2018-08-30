const SET_TODAY_STATISTIC = 'SET_TODAY_STATISTIC'
const SET_TOTAL_STATISTIC = 'SET_TOTAL_STATISTIC'

const initialState = {
    todayStatistic: {
        orders: 0,
        sales: 0,
        customers: 0
    },
    totalStatistic: {
        orders: 0,
        sales: 0,
        customers: 0
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_TODAY_STATISTIC:
            return {
                ...state,
                todayStatistic: action.payload.todayStatistic
            }
        case SET_TOTAL_STATISTIC:
            return {
                ...state,
                totalStatistic: action.payload.totalStatistic
            }
        default:
            return state
    }
}