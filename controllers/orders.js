const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.getOrder = (req, res, next) => {
    db.query('SELECT * FROM orders', async (error, result) => {
        console.log(result);
        // if(error) {
        //     console.log(error);
        //     return next();
        // } 

        // if(result.length == 0) {
        //     return next();
        // } else {
        //     req.order = result;
        // } 
        return next();
    });
}

