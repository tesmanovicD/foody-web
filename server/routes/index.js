const express = require('express')
const router = express.Router()
const customersRoute = require('./customers')
const foodItemsRoute = require('./foodItems')
const employeeRoute = require('./employee')
const foodCategoryRoute = require('./foodCategory')
const orderItemsRoute = require('./orderItems')
const orderPaymentsRoute = require('./orderPayments')

router.get('/', (req, res) => {
    res.send("now then")
})

// router.get('/customers', customersRoute)
// router.get('/foodItems', foodItemsRoute)
// router.get('/employee', employeeRoute)
// router.get('/foodCategory', foodCategoryRoute)
// router.get('/orderItems', orderItemsRoute)
// router.get('/orderPayments', orderPaymentsRoute)

module.exports = router