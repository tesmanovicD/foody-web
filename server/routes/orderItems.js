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
          return res.status(500).send("No orders")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
	const { items, lastId } = req.body

		
    const ADD_ORDER_ITEM = `INSERT INTO order_items (id_order, id_item, item, quantity, price, total) VALUES ?`
    
    let values = [...items.map(i => {
        return [
            lastId, i.id, i.name, i.quantity, i.price, i.quantity * i.price
        ]
    })]

    conn.query(ADD_ORDER_ITEM, [values], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("error")
        } else {
            return res.status(200).send(`Items added succesfully`)
        }
    });

})

router.put("/edit", (req, res) => {
    const { id, idOrder, item, price, quantity, total } = req.body

    if (!id || !idOrder || !item || !quantity || !price || !total) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_ORDER_ITEM = `UPDATE order_items SET 
                            name= ${name}, item= ${item}, quantity= ${quantity}, price= ${price}, 
                            total= "${total}"
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