const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_ORDER_PAYMENTS = id ?
    `SELECT op.id, op.id_customer, date, op.price, order_no, c.fname, c.lname,
    UNIX_TIMESTAMP(date) as date, UNIX_TIMESTAMP(pickup_date) as pickup_date, status FROM order_payments op
    LEFT OUTER JOIN customers c ON op.id_customer = c.id WHERE op.id = ${id}`
    :
    `SELECT op.id, op.id_customer, date, op.price, order_no, c.fname, c.lname,
    UNIX_TIMESTAMP(date) as date, UNIX_TIMESTAMP(pickup_date) as pickup_date, status FROM order_payments op
    LEFT OUTER JOIN customers c ON op.id_customer = c.id`
    
    conn.query(SELECT_ORDER_PAYMENTS, (err, result) => {
      if (err) {
        return res.status(500).send("Something went wrong, please try again later")
      } else {
        if (result.length == 0) {
          return res.status(500).send("No order payments")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.get("/getUserOrders/:id", (req, res) => {
    const id = req.params.id

    if (!id) {
        return res.status(500).send("You must provide user id")
    }
    const SELECT_USER_ORDERS = `SELECT * FROM order_payments WHERE id_customer= ${id}`

    conn.query(SELECT_USER_ORDERS, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            if (result.length == 0) {
                return res.status(500).send("User does not have recent orders")
            } else {
                return res.status(200).json(result)
            }
        }
    })
})

router.get("/getOrderItems/:id", (req, res) => {
    const id = req.params.id

    if (!id) {
        return res.status(500).send("You must provide order id")
    }
    const SELECT_ITEMS_FOR_ORDER = `SELECT * FROM order_items WHERE id_order= ${id}`

    conn.query(SELECT_ITEMS_FOR_ORDER, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            if (result.length == 0) {
                return res.status(500).send("There is no items for requested order")
            } else {
                return res.status(200).json(result)
            }
        }
    })

})

router.post("/add", (req, res) => {
    const { idCustomer, orderNo } = req.body
    
    if (!idCustomer) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_ORDER_PAYMENT = `INSERT INTO order_payments (id_customer, order_no) 
                          VALUES ('${idCustomer}', '${orderNo}')`

    conn.query(ADD_ORDER_PAYMENT, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            const lastId = result.insertId
            return res.status(200).json({lastId})
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, price } = req.body

    if (!id || !price) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_ORDER_PAYMENTS = `UPDATE order_payments SET 
                            price= ${price}
                            WHERE id= ${id}`

    conn.query(UPDATE_ORDER_PAYMENTS, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Order ID ${id} edited succesfully`)
        }
    })
})

router.put('/changeStatus', (req, res) => {
    const { id, status } = req.body
    const pickupDate = req.body.pickupDate 

    if (!id || !status) {
        return res.status(500).send("You must provide all required params")
    }

    const UPDATE_ORDER_STATUS = pickupDate ?
        `UPDATE order_payments SET status= "${status}", pickup_date= '${pickupDate}' WHERE id= ${id}`
        :
        `UPDATE order_payments SET status= "${status}" WHERE id= ${id}`

    conn.query(UPDATE_ORDER_STATUS, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send("Status updated")
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_ORDER_PAYMENT = `DELETE FROM order_payments WHERE id = ${id}`

        conn.query(DELETE_ORDER_PAYMENT, (err) => {
            if (err) {
                return res.status(500).send("Something went wrong, please try again later")
            } else {
                return res.status(200).send(`Order with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(500).send("You must provide order ID")
    }
})

module.exports = router