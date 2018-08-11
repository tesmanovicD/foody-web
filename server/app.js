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

app.use(cors())
app.options("*", cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use('/customers', customersRoute)
app.use('/foodItems', foodItemsRoute)
app.use('/employee', employeeRoute)
app.use('/foodCategory', foodCategoryRoute)
app.use('/orderItems', orderItemsRoute)
app.use('/orderPayments', orderPaymentsRoute)