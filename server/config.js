const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foody'
})

conn.connect((err => console.log(err)))

module.exports = conn