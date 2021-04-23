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

        if(result.length == 0) {
            return next();
        } else {
            productNames = generateCartHtml(result);
            req.products = productNames;
        } 
        return next();
    });
}

function generateCartHtml(products) {
    let productNames = [];
    for(let i = 0; i < products.length; i++){
        productNames.push(products[i].productID);
        // replace character string with a .env so no injections
        productNames.push((products[i].name).replace(",", "**2Z$*4TZQ$**3")); // replaced characters reference on generateCart.js line 31
        productNames.push(products[i].category);
        productNames.push(products[i].price);
        productNames.push("\\");
    }
    return productNames;
}

exports.createOrder = (req, res, next) => {
    console.log('firing');
    reqValues = req.body.values
    reqValues = reqValues.split(",");
    price = parseFloat(reqValues[0].replace("$", ""));
    numberOfProducts = parseInt(reqValues[1]);
    let trackingNumber = Math.round(Math.random() * 10000000000);
    trackingNumber = validateTrackingNum(trackingNumber);

    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let date = cMonth + "/" + cDay + "/" + cYear;

    let defaultShippingMethod = "USPS Priority Mail";
    
    if(numberOfProducts == 0) {
        return res.render('cart', {
            message: 'You have no items in your cart'
        });
    }

    db.query('INSERT INTO orders SET ?', {tracking_number: trackingNumber, order_date: date, ship_method: defaultShippingMethod, number_of_products: numberOfProducts}, (error, results) => {
        if(error) {
            console.log(error);
            return next();
        } else {
            return next();
        }
    });
}


function validateTrackingNum(trackingNumber) {
    
    db.query('SELECT tracking_number FROM products WHERE tracking_number = ?', [trackingNumber], async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 

        if(result.length == 0) {
            return trackingNumber;
        } else {
            console.log('repeat hit');
            trackingNum = Math.round(Math.random() * 10000000000000); 
            validateTrackingNum(trackingNum)
        } 
    });
}
