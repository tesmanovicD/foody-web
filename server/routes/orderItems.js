const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_ORDER_ITEMS = id ?
      `SELECT * FROM order_items WHERE id = ${id}`
      :
      `SELECT * FROM order_items`
    
    conn.query(SELECT_ORDER_ITEMS, (err, result) => {
      if (err) {
        console.log("err")
      } else {
        if (result.length == 0) {
          return res.send("No orders")
        } else {
          return res.json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
    const { idFood, idCustomer, quantity, price, status, date, pickupDate } = req.body

    if (!idFood || !idCustomer || !quantity || !price || !status || date || pickupDate) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_ORDER_ITEM = `INSERT INTO order_items (id_food, id_customer, quantity, price, status, date, pickup_date) 
                          VALUES (${idFood}, ${idCustomer}, ${quantity}, ${price}, '${status}', '${date}', '${pickupDate}')`

    conn.query(ADD_ORDER_ITEM, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(`Order ${idFood} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, idFood, idCustomer, price, quantity, status, date, pickupDate } = req.body

    if (!id || !idFood || !idCustomer || !price || !quantity || !status || !date || !pickupDate) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_ORDER_ITEM = `UPDATE order_items SET 
                            id_food= ${idFood}, id_customer= ${idCustomer}, price= ${price}, quantity= ${fname}, 
                            status= "${status}", date= "${date}", pickup_date= "${pickupDate}"
                            WHERE id= ${id}`

    conn.query(UPDATE_ORDER_ITEM, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Order ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_ORDER_ITEM = `DELETE FROM order_items WHERE id = ${id}`

        conn.query(DELETE_ORDER_ITEM, (err, result) => {
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