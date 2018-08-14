const SET_FOOD_ITEMS = 'SET_FOOD_ITEMS'
const DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM'
const SET_FOOD_CATEGORIES = 'SET_FOOD_CATEGORIES'
const DELETE_FOOD_CATEGORY = 'DELETE_CATEGORY'

const initialState = {
    items: [],
    categories: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_FOOD_ITEMS:
            return {
                ...state,
                items: action.payload.items
            }
        case DELETE_FOOD_ITEM:
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload.id)
            }
        case SET_FOOD_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories
            }
        case DELETE_FOOD_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(s => s.id !== action.payload.id)
            }
        default:
            return state
    }
}