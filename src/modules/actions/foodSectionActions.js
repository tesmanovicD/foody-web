import api from '../../utils/api';

function getAllItems() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/foodItems')
            .then(items => {
                dispatch({ type: 'SET_FOOD_ITEMS', payload: {items} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function getSingleItem(id) {
    return new Promise((resolve, reject) => {
        api.get(`/foodItems/${id}`)
        .then(item => {
            resolve(...item)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function addItem(item) {
    return new Promise((resolve, reject) => {
        api.post('/foodItems/add', item)
        .then(() => {
            console.log("added")
            resolve()
        })
        .catch(err => reject(err))
    })
}

function editItem(id, item) {
    return new Promise((resolve, reject) => {
        api.put('/foodItems/edit', {id, ...item})
        .then(() => {
            resolve()
        })
        .catch(err => reject(err))
    })
}

function deleteItem(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.delete(`/foodItems/delete/${id}`)
            .then((res) => {
                dispatch({ type: 'DELETE_FOOD_ITEM', payload: {id} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
    
}

function getAllCategories() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/foodCategory')
            .then(categories => {
                dispatch({ type: 'SET_FOOD_CATEGORIES', payload: {categories} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function getSingleCategory(id) {
    return new Promise((resolve, reject) => {
        api.get(`/foodCategory/${id}`)
        .then(category => {
            resolve(...category)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function addCategory(category) {
    return new Promise((resolve, reject) => {
        api.post('/foodCategory/add', category)
        .then(() => {
            console.log("added")
            resolve()
        })
        .catch(err => reject(err))
    })
}

function editCategory(id, category) {
    return new Promise((resolve, reject) => {
        api.put('/foodCategory/edit', {id, ...category})
        .then(() => {
            console.log("test");
            resolve()
        })
        .catch(err => reject(err))
    })
}

function deleteCategory(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.delete(`/foodCategory/delete/${id}`)
            .then((res) => {
                dispatch({ type: 'DELETE_FOOD_CATEGORY', payload: {id} })
                console.log(res)
                resolve()
            })
            .catch(err => reject(err))
        })
    }
    
}

export default {
    getAllItems,
    getSingleItem,
    addItem,
    editItem,
    deleteItem,
    getAllCategories,
    getSingleCategory,
    addCategory,
    editCategory,
    deleteCategory
}