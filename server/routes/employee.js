const express = require('express')
const router = express.Router()
const conn = require('../config')
const helper = require('../helper')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_EMPLOYEE = id ?
      `SELECT * FROM employee WHERE id = ${id}`
      :
      `SELECT * FROM employee`
    
    conn.query(SELECT_EMPLOYEE, (err, result) => {
      if (err) {
        return res.status(500).send("Something went wrong, please try again later")
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

    const hashedPassword = helper.saltHashPassword(password)
    const ADD_EMPLOYEE = `INSERT INTO employee (username, password, fname, lname) 
                          VALUES ('${username}', '${hashedPassword}', '${fname}', '${lname}')`

    conn.query(ADD_EMPLOYEE, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Employee ${fname} ${lname} added succesfully`)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, username, fname, lname } = req.body

    if (!id || !username || !fname || !lname) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_EMPLOYEE = `UPDATE employee SET 
                            username= "${username}", fname= "${fname}", lname= "${lname}"
                            WHERE id= ${id}`

    conn.query(UPDATE_EMPLOYEE, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Employee ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_EMPLOYEE = `DELETE FROM employee WHERE id = ${id}`

        conn.query(DELETE_EMPLOYEE, (err) => {
            if (err) {
                return res.status(500).send("Something went wrong, please try again later")
            } else {
                return res.status(200).send(`Employee with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(500).send("You must provide employee ID")
    }
})

router.post('/authenticate', (req, res) => {
    const { username, password } = req.body

    if ( !username || !password) {
        return res.status(500).send("You must enter username and password")
    }

    const hashedPassword = helper.saltHashPassword(password)
    const AUTHENTICATE_USER = `SELECT id, fname, lname FROM employee WHERE username = "${username}" AND password = "${hashedPassword}" `
    conn.query(AUTHENTICATE_USER, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            if (result.length == 0) {
                return res.status(500).send("Wrong username or password")
            } else {
                return res.status(200).send(...result)
            }
        }
    })
})

module.exports = router