const express = require('express')
const router = express.Router()
const conn = require('../config')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/food/")
    },
    filename: function(req, file, cb) {
        cb(null, Math.random().toFixed(2) + "_"+file.originalname)
    }
})
const upload = multer({storage: storage})

router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_FOOD_ITEMS = id ?
      `SELECT * FROM food_items WHERE id = ${id}`
      :
      `SELECT * FROM food_items`
    
    conn.query(SELECT_FOOD_ITEMS, (err, result) => {
      if (err) {
        return res.status(500).send("Something went wrong, please try again later")
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
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            if (result.length == 0) {
                return res.status(500).send("No food in this category")
            } else {
                return res.status(200).json(result)
            }
        }
    })


})

router.post("/add", upload.single('image'), (req, res) => {
    const { name, description, category, price, quantity } = req.body
    const image = req.file? req.file.filename : "no_image.png" 

    if (!name || !description || !category || !price || !quantity) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_FOOD_ITEM = `INSERT INTO food_items (name, description, category, image, price, quantity) 
                          VALUES ('${name}', '${description}', '${category}', '${image}', ${price}, ${quantity})`

    conn.query(ADD_FOOD_ITEM, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
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
                            name= "${name}", description= "${description}", price= "${price}", quantity= "${quantity}", category= "${category}"
                            WHERE id= ${id}`

    conn.query(UPDATE_FOOD_ITEM, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Meal ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_FOOD_ITEM = `DELETE FROM food_items WHERE id = ${id}`

        conn.query(DELETE_FOOD_ITEM, (err) => {
            if (err) {
                return res.status(500).send("Something went wrong, please try again later")
            } else {
                return res.status(200).send(`Meal with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide meal ID")
    }
})

module.exports = router