const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_ORDER_PAYMENTS = id ?
      `SELECT * FROM order_payments WHERE id = ${id}`
      :
      `SELECT * FROM order_payments`
    
    conn.query(SELECT_ORDER_PAYMENTS, (err, result) => {
      if (err) {
        console.log("err")
      } else {
        if (result.length == 0) {
          return res.send("No order payments")
        } else {
          return res.json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
    const { idCustomer, amount } = req.body

    if (!idCustomer || !amount) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_ORDER_PAYMENT = `INSERT INTO order_payments (id_customer, amount) 
                          VALUES ('${idCustomer}', '${amount}')`

    conn.query(ADD_ORDER_PAYMENT, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(`Order added succesfully`)
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