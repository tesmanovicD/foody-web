const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_CUSTOMERS = id ?
      `SELECT * FROM customers WHERE id = ${id}`
      :
      `SELECT * FROM customers`
    
    conn.query(SELECT_CUSTOMERS, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result.length == 0) {
          return res.status(500).send("No customers")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
    const { email, password, fname, lname, phone } = req.body

    if (!email || !password || !fname || !lname) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_CUSTOMER = `INSERT INTO customers (email, password, phone, fname, lname) 
                          VALUES ('${email}', '${password}', '${phone}', '${fname}', ${lname})`

    conn.query(ADD_CUSTOMER, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(`Customer ${fname} ${lname} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    console.log(req.body)
    const { id, email, password, fname, lname, phone } = req.body

    if (!id || !email || !password || !fname || !lname) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_CUSTOMER = `UPDATE customers SET 
                            email= "${email}", password= "${password}", phone= "${phone}", fname= "${fname}", lname= "${lname}"
                            WHERE id= ${id}`

    conn.query(UPDATE_CUSTOMER, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Customer ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_CUSTOMER = `DELETE FROM customers WHERE ID = ${id}`

        conn.query(DELETE_CUSTOMER, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).send(`Customer with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide customer ID")
    }
})

module.exports = router