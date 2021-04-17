const mysql = require("mysql");

module.exports = {
    db: mysql.createPool({
        host: "us-cdbr-east-03.cleardb.com",
        user: "b04903d33dd1c0",
        password: "d17038e0",
        database: "heroku_ce5d691c17f624d"
    })
}