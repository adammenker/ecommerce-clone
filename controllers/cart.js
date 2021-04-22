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
    // change to getting products from 'cart' table with given userID
    db.query('SELECT * FROM products', async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 

        // console.log(result);
        if(result.length == 0) {
            
            return next();
        } else {
            productNames = generateCartHtml(result);
            req.productsNames = productNames;
        } 
        return next();
    });
}

function generateCartHtml(products, attr) {
    let productArr = [];
    for(let i = 0; i < products.length; i++){
        productArr.push(products[i].name);
        productArr.push("\\");
    }
    return productArr;
}


