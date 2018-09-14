const express = require('express')
const router = express.Router()
const conn = require('../config')


router.get(["/", "/:id"], (req, res) => {
    const id = req.params.id ? req.params.id : null
    const SELECT_COUPONS = id ?
      `SELECT id, code, type, discount, usage_limit, used_coupons, 
      UNIX_TIMESTAMP(start_date) as start_date, UNIX_TIMESTAMP(end_date) as end_date, status FROM coupons WHERE id = ${id}`
      :
      `SELECT id, code, type, discount, usage_limit, used_coupons, 
      UNIX_TIMESTAMP(start_date) as start_date, UNIX_TIMESTAMP(end_date) as end_date, status FROM coupons`
    
    conn.query(SELECT_COUPONS, (err, result) => {
      if (err) {
        return res.status(500).send("Something went wrong, please try again later")
      } else {
        if (result.length == 0) {
          return res.status(500).send("No coupons")
        } else {
          return res.status(200).json(result)
        }
      }
    })
})

router.post("/add", (req, res) => {
    const { code, discountType, discount, usageLimit, startDate, endDate, status } = req.body

    if (!code || !discountType || !discount || !usageLimit || !startDate || !endDate) {
        return res.status(500).send("You must fill required fields")
    }

    const ADD_COUPON = `INSERT INTO coupons (code, type, start_date, discount, usage_limit, end_date, status) 
                          VALUES ('${code}', '${discountType}', '${startDate}', ${discount}, ${usageLimit}, '${endDate}', '${status}')`

    conn.query(ADD_COUPON, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Coupon ${code} added succesfully`)
        }
    })
})

router.put('/usageIncrement', (req, res) => {
    const { code } = req.body

    if (!code) {
        return res.status(500).send("You must provide Coupon ID")
    }

    const UPDATE_COUPON_USAGE = `UPDATE coupons SET used_coupons= used_coupons + 1 WHERE code = "${code}" `

    conn.query(UPDATE_COUPON_USAGE, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.sendStatus(200)
        }
    })
})

router.put("/edit", (req, res) => {
    const { id, code, discountType, discount, usageLimit, startDate, endDate, status } = req.body

    if (!id || !code || !discountType || !discount || !usageLimit || !startDate || !endDate) {
        return res.status(500).send("You must fill required fields")
    }

    const UPDATE_COUPON = `UPDATE coupons SET 
                            code= '${code}', type= '${discountType}', start_date= '${startDate}', discount= ${discount}, usage_limit= ${usageLimit},
                            end_date= '${endDate}', status= '${status}'
                            WHERE id= ${id}`

    conn.query(UPDATE_COUPON, (err) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            return res.status(200).send(`Coupon ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_COUPON = `DELETE FROM coupons WHERE ID = ${id}`

        conn.query(DELETE_COUPON, (err) => {
            if (err) {
                return res.status(500).send("Something went wrong, please try again later")
            } else {
                return res.status(200).send(`Coupon with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(500).send("You must provide coupon ID")
    }
}) 

router.get('/verify/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (!id) {
        return res.status(500).send("You must provide coupon ID")
    }

    const VERIFY_COUPON = `SELECT discount, type FROM coupons WHERE code= "${id}" AND status = "active" AND used_coupons < usage_limit`
    
    conn.query(VERIFY_COUPON, (err, result) => {
        if (err) {
            return res.status(500).send("Something went wrong, please try again later")
        } else {
            if (!result.length) {
                return res.status(500).send(`Coupon ID ${id} is invalid/inactive`)
            }
            return res.status(200).send(result[0])
        }
    })
})

module.exports = router