const express = require('express')
const router = express.Router()
const conn = require('../config')

router.get('/total', (req, res) => {
    const GET_TOTAL_STATISTIC = `SELECT  (
        SELECT COUNT(order_payments.id)
        FROM   order_payments
        ) AS orders,
        (
        SELECT COUNT(customers.id)
        FROM customers 
        ) AS customers,
        (
        SELECT SUM(order_payments.price)
        FROM order_payments
        ) AS sales`
    
    conn.query(GET_TOTAL_STATISTIC, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        }

        return res.status(200).json(...result)
    })
})

router.get('/today', (req, res) => {
    const GET_TODAY_STATISTIC = `SELECT  (
        SELECT COUNT(order_payments.id)
        FROM order_payments WHERE date(date) = CURDATE()
        ) AS orders,
        (
        SELECT COUNT(customers.id)
        FROM  customers WHERE date(date_registered) = CURDATE() 
        ) AS customers,
        (
        SELECT SUM(order_payments.price)
        FROM order_payments WHERE date(date) = CURDATE()
        ) AS sales`

    conn.query(GET_TODAY_STATISTIC, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        }

        return res.status(200).json(...result)
    })
})

module.exports = router