import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import user from '../reducers/userReducer'
import customers from '../reducers/customerReducer'
import employee from '../reducers/employeeReducer'
import orders from '../reducers/orderReducer'
import coupons from '../reducers/couponReducer'
import foods from '../reducers/foodSectionReducer'

const rootReducer = combineReducers({
    user,
    customers,
    employee,
    orders,
    coupons,
    foods
})

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

export default store