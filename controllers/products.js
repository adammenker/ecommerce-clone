const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});



exports.getProduct = (req, res, next) => {
    console.log(req.body);
    // console.log(res);
    // db.query('SELECT * FROM products WHERE name = ?', [productName], async (error, result) => {
    //     if(error) {
    //         console.log(error);
    //         return next();
    //     } 

    //     if(result.length == 0) {
    //         return res.render('orderSummary', {
    //             message: 'You Have No Previous Orders'
    //         });
    //     } else {
    //         req.orders = generateOrderHtml(result);
    //     } 
    //     return next();
    // });
    return next();
}

exports.insertAutofillScript = (req, res, next) => {
    db.query('SELECT name FROM products', async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 
        
        // console.log(productNames);
        if(result.length == 0) {
            return next();
        } else {
            productNames = generateProductHtml(result);
            req.productNames = productNames;
        } 
        return next();
    });
}

function generateProductHtml(products) {
    let productNames = [];
    for(let i = 0; i < products.length; i++){
        // replace character string with a .env so no injections
        productNames.push(products[i].name); // replaced characters reference on generateCart.js line 31
        productNames.push("\\");
    }
    return productNames;
}


