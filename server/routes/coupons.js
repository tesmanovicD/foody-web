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
        console.log(err)
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

    conn.query(ADD_COUPON, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(`Coupon ${code} added succesfully`)
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

    conn.query(UPDATE_COUPON, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(`Coupon ID ${id} edited succesfully`)
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id ? req.params.id : null

    if (id) {
        const DELETE_COUPON = `DELETE FROM coupons WHERE ID = ${id}`

        conn.query(DELETE_COUPON, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                return res.status(200).send(`Coupon with ID ${id} succesfully deleted`)
            }
        })
    } else {
        return res.status(400).send("You must provide coupon ID")
    }
})

module.exports = router