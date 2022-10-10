const mysql = require('mysql2')
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat"
})

module.exports = conn