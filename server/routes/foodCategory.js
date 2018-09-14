const express = require('express')
const router = express.Router()
const conn = require('../config')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/category/")
    },
    filename: function(req, file, cb) {
        cb(null, Math.random().toFixed(2) + "_"+file.originalname)
    }
})
const upload = multer({storage: storage})


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_FOOD_CATEGORY = id ?
      `SELECT * FROM food_category WHERE id = ${id}`
      :
      `SELECT * FROM food_category`
    
    conn.query(SELECT_FOOD_CATEGORY, (err, result) => {
      if (err) {
        return res.status(500).send("Something went wrong, please try again later")
      } else {
        if (result.length == 0) {
          return res.status(500).send("No food category")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.post("/add", upload.single('image'), (req, res) => {
    const { name, description } = req.body
    const image = req.file? req.file.filename : "no_image.png" 


    if (!name) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_FOOD_CATEGORY = `INSERT INTO food_category (name, description, image) 
                          VALUES ('${name}', '${description}', '${image}')`

    conn.query(ADD_FOOD_CATEGORY, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Category ${name} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, name, description } = req.body

    if (!id || !name) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_FOOD_CATEGORY = `UPDATE food_category SET 
                            name= "${name}", description= "${description}"
                            WHERE id= ${id}`

    conn.query(UPDATE_FOOD_CATEGORY, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Category ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_FOOD_CATEGORY = `DELETE FROM food_category WHERE id = ${id}`

        conn.query(DELETE_FOOD_CATEGORY, (err) => {
            if (err) {
                return res.status(500).send("Something went wrong, please try again later")
            } else {
                return res.status(200).send(`Category with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(500).send("You must provide meal ID")
    }
})

module.exports = router