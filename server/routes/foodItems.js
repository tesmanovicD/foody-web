const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_FOOD_ITEMS = id ?
      `SELECT * FROM food_items WHERE id = ${id}`
      :
      `SELECT * FROM food_items`
    
    conn.query(SELECT_FOOD_ITEMS, (err, result) => {
      if (err) {
        console.log("err")
      } else {
        if (result.length == 0) {
          return res.status(500).send("No foods")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.get("/category/:id", (req, res) => {
    const id = req.params.id
    const SELECT_FOOD_ITEMS_FROM_CATEGORY = `SELECT * FROM food_items WHERE category = ${id}`

    if (!id) {
        return res.status(500).send("You must provide ID")
    }

    conn.query(SELECT_FOOD_ITEMS_FROM_CATEGORY, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length == 0) {
                return res.status(500).send("No food in this category")
            } else {
                return res.status(200).json(result)
            }
        }
    })


})

router.post("/add", (req, res) => {
    const { name, description, category, price, quantity } = req.body

    if (!name || !description || !category || !price || !quantity) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_FOOD_ITEM = `INSERT INTO food_items (name, description, category, price, quantity) 
                          VALUES ('${name}', '${description}', '${category}', ${price}, ${quantity})`

    conn.query(ADD_FOOD_ITEM, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(`Meal ${name} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, name, description, price, quantity, category } = req.body

    if (!id || !name || !description || !price || !quantity || !category) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_FOOD_ITEM = `UPDATE food_items SET 
                            name= "${name}", description= "${description}", price= "${price}", quantity= "${fname}", category= "${category}"
                            WHERE id= ${id}`

    conn.query(UPDATE_FOOD_ITEM, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Meal ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_FOOD_ITEM = `DELETE FROM food_items WHERE id = ${id}`

        conn.query(DELETE_FOOD_ITEM, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).send(`Meal with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide meal ID")
    }
})

module.exports = router