const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_FOOD_CATEGORY = id ?
      `SELECT * FROM food_category WHERE id = ${id}`
      :
      `SELECT * FROM food_category`
    
    conn.query(SELECT_FOOD_CATEGORY, (err, result) => {
      if (err) {
        console.log("err")
      } else {
        if (result.length == 0) {
          return res.send("No food category")
        } else {
          return res.json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
    const { name, description } = req.body

    if (!name) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_FOOD_CATEGORY = `INSERT INTO food_category (name, description) 
                          VALUES ('${name}', '${description}')`

    conn.query(ADD_FOOD_CATEGORY, (err, result) => {
        if (err) {
            console.log(err)
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

    conn.query(UPDATE_FOOD_CATEGORY, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Category ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_FOOD_CATEGORY = `DELETE FROM food_category WHERE id = ${id}`

        conn.query(DELETE_FOOD_CATEGORY, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).send(`Category with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide meal ID")
    }
})

module.exports = router