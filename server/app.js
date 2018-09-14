const express = require('express')
const routes = require('./routes/index')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000

const customersRoute = require('./routes/customers')
const foodItemsRoute = require('./routes/foodItems')
const employeeRoute = require('./routes/employee')
const foodCategoryRoute = require('./routes/foodCategory')
const orderItemsRoute = require('./routes/orderItems')
const orderPaymentsRoute = require('./routes/orderPayments')
const couponsRoute = require('./routes/coupons')
const statisticsRoute = require('./routes/statistics')

app.use(cors())
app.options("*", cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
app.use('/uploads/food', express.static("uploads/food"))
app.use('/uploads/category', express.static("uploads/category"))

app.listen(PORT, (err) => {
    if (err) {
        return res.status(500).send("Connection lost: The server closed the connetion")
    }
    console.log(`Listening on port ${PORT}`)
})

app.use('/customers', customersRoute)
app.use('/foodItems', foodItemsRoute)
app.use('/employee', employeeRoute)
app.use('/foodCategory', foodCategoryRoute)
app.use('/orderItems', orderItemsRoute)
app.use('/orderPayments', orderPaymentsRoute)
app.use('/coupons', couponsRoute)
app.use('/statistics', statisticsRoute)