const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_EMPLOYEE = id ?
      `SELECT * FROM employee WHERE id = ${id}`
      :
      `SELECT * FROM employee`
    
    conn.query(SELECT_EMPLOYEE, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result.length == 0) {
          return res.status(500).send("No employee")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
    const { username, password, fname, lname } = req.body

    if (!username || !password || !fname || !lname) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_EMPLOYEE = `INSERT INTO employee (username, password, fname, lname) 
                          VALUES ('${username}', '${password}', '${fname}', '${lname}')`

    conn.query(ADD_EMPLOYEE, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).send(`Employee ${fname} ${lname} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, username, password, fname, lname } = req.body

    if (!id || !username || !password || !fname || !lname) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_EMPLOYEE = `UPDATE employee SET 
                            username= "${username}", password= "${password}", fname= "${fname}", lname= "${lname}"
                            WHERE id= ${id}`

    conn.query(UPDATE_EMPLOYEE, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Employee ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_EMPLOYEE = `DELETE FROM employee WHERE id = ${id}`

        conn.query(DELETE_EMPLOYEE, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).send(`Employee with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide employee ID")
    }
})

router.post('/authenticate', (req, res) => {
    const { username, password } = req.body

    if ( !username || !password) {
        return res.status(500).send("You must enter username and password")
    }

    const AUTHENTICATE_USER = `SELECT Fname, Lname FROM employee WHERE username = "${username}" AND password = "${password}" `
    conn.query(AUTHENTICATE_USER, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length == 0) {
                return res.status(500).send("Wrong username or password")
            } else {
                return res.status(200).send(result)
            }
        }
    })
})

module.exports = router