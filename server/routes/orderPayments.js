const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    // const SELECT_ORDER_PAYMENTS = id ?
    //   `SELECT op.id, date, op.price, order_no, oi.item, oi.quantity,
    //   UNIX_TIMESTAMP(date) as date, UNIX_TIMESTAMP(pickup_date) as pickup_date, status, c.email FROM order_payments op
    //   INNER JOIN order_items oi ON op.id = oi.id_order
    //   LEFT OUTER JOIN customers c ON op.id_customer = c.id WHERE op.id = ${id}`
    //   :
    //   `SELECT op.id, date, op.price, order_no, oi.item, oi.quantity,
    //   UNIX_TIMESTAMP(date) as date, UNIX_TIMESTAMP(pickup_date) as pickup_date, status, c.email FROM order_payments op
    //   INNER JOIN order_items oi ON op.id = oi.id_order
    //   LEFT OUTER JOIN customers c ON op.id_customer = c.id`
    const SELECT_ORDER_PAYMENTS = id ?
    `SELECT op.id, date, op.price, order_no, c.fname, c.lname,
    UNIX_TIMESTAMP(date) as date, UNIX_TIMESTAMP(pickup_date) as pickup_date, status FROM order_payments op
    LEFT OUTER JOIN customers c ON op.id_customer = c.id WHERE op.id = ${id}`
    :
    `SELECT op.id, date, op.price, order_no, c.fname, c.lname,
    UNIX_TIMESTAMP(date) as date, UNIX_TIMESTAMP(pickup_date) as pickup_date, status FROM order_payments op
    LEFT OUTER JOIN customers c ON op.id_customer = c.id`
    
    conn.query(SELECT_ORDER_PAYMENTS, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result.length == 0) {
          return res.status(500).send("No order payments")
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
            console.log(err)
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

    conn.query(UPDATE_ORDER_PAYMENTS, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Order ID ${id} edited succesfully`)
        }
    })
})

router.put('/changeStatus', (req, res) => {
    const { id, status } = req.body

    if (!id || !status) {
        res.status(500).send("You must provide all required params")
    }

    const UPDATE_ORDER_STATUS = `UPDATE order_payments SET status= "${status}" WHERE id= ${id}`

    conn.query(UPDATE_ORDER_STATUS, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send("Status updated")
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_ORDER_PAYMENT = `DELETE FROM order_payments WHERE id = ${id}`

        conn.query(DELETE_ORDER_PAYMENT, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).send(`Order with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide order ID")
    }
})

module.exports = router