const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});



exports.getProduct = (req, res, next) => {
    let productName;
    if(req.body.userInput) {
        productName = req.body.userInput;
    } else if(req.body.clickedProduct) {
        productName = req.body.clickedProduct;
    }
    db.query('SELECT * FROM products WHERE name = ?', [productName], async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 
        
        if(result.length == 0) {
            req.message = "We Couldn't Find a Product With That Name"
        } else {
            result[0].price = (parseFloat(result[0].price).toFixed(2)).toString();
            req.product = result[0];
        } 
        return next();
    });
}

exports.insertAutofillScript = (req, res, next) => {
    db.query('SELECT name FROM products', async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 
        
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


exports.getAllProducts = (req, res, next) => {
    db.query('SELECT * FROM products', async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 
        
        if(result.length == 0) {
            req.message = "We Couldn't Find Any Available Products"
        } else {
            req.allProducts = generateAllProductsArray(result);
        } 
        return next();
    });
}


function generateAllProductsArray(allProducts) {
    let allProductsArray = [];
    for(let i = 0; i < allProducts.length; i++){
        // replace character string with a .env so no injections
        allProductsArray.push(`${allProducts[i].name}***23GA2e1SADF2***${allProducts[i].image}***23GA2e1SADF2***`); // replaced characters reference on generateCart.js line 31
    }
    return allProductsArray;
}