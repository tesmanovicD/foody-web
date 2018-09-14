const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'https://www.db4free.net',
    user: 'foodyusername',
    password: 'foodypass',
    database: 'foodydatabase'
})

conn.connect((err => console.log(err)))

module.exports = conn