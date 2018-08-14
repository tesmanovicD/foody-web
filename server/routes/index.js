const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("now then")
})

module.exports = router