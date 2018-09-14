const express = require('express')
const router = express.Router()
const conn = require('../config')
const helper = require('../helper')

router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_CUSTOMERS = id ?
      `SELECT * FROM customers WHERE id = ${id}`
      :
      `SELECT * FROM customers`
    
    conn.query(SELECT_CUSTOMERS, (err, result) => {
      if (err) {
        return res.status(500).send("Something went wrong, please try again later")
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

    const hashedPassword = helper.saltHashPassword(password)
    const ADD_CUSTOMER = `INSERT INTO customers (email, password, phone, fname, lname) 
                          VALUES ('${email}', '${hashedPassword}', '${phone}', '${fname}', '${lname}')`

    conn.query(ADD_CUSTOMER, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Customer ${fname} ${lname} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, email, fname, lname, phone } = req.body

    if (!id || !email || !fname || !lname) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_CUSTOMER = `UPDATE customers SET 
                            email= "${email}", phone= "${phone}", fname= "${fname}", lname= "${lname}"
                            WHERE id= ${id}`

    conn.query(UPDATE_CUSTOMER, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Customer ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_CUSTOMER = `DELETE FROM customers WHERE ID = ${id}`

        conn.query(DELETE_CUSTOMER, (err) => {
            if (err) {
                return res.status(500).send("Something went wrong, please try again later")
            } else {
                return res.status(200).send(`Customer with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(500).send("You must provide customer ID")
    }
})

router.post('/authenticate', (req, res) => {
    const { email, password } = req.body

    if ( !email || !password) {
        return res.status(500).send("You must enter email and password")
    }

    const hashedPassword = helper.saltHashPassword(password)
    const AUTHENTICATE_USER = `SELECT id, fname, lname FROM customers WHERE email = "${email}" AND password = "${hashedPassword}" `
    conn.query(AUTHENTICATE_USER, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            if (result.length == 0) {
                return res.status(500).send("Wrong email or password")
            } else {
                return res.status(200).send(result[0])
            }
        }
    })
})

module.exports = router