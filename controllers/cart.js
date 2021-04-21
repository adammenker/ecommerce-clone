const mysql = require("mysql");

const { promisify } = require("util");

// file path not working
// const dotenv = require("dotenv");

// dotenv.config({path: './.env'});
// console.log(process.env.JWT_SECRET);
// console.log(dotenv);

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.getCart = (req, res, next) => {
    // console.log(req.body);

    // destructuring
    // const {name, phone, email, password, passwordConfirm} = req.body;

    // change to getting products from 'cart' table with given userID
    db.query('SELECT * FROM products', async (error, results) => {
        if(error) {
            console.log(error);
            return next();
        } 

        console.log(results);
        if(results.length > 0) {
            return res.render('cart', {
                message: 'There are no items in your cart'
            });
        }  
        return next();
    });
}


