const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.createOrder = (req, res, next) => {
    userID = req.user.userID;
    reqValues = req.body.values
    reqValues = reqValues.split(",");
    price = parseFloat(reqValues[0].replace("$", ""));
    numberOfProducts = parseInt(reqValues[1]);
    let trackingNumber = (Math.round(100000000 * Math.random())).toString();
    // trackingNumber = validateTrackingNum(trackingNumber);

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
    } else {
        req.price = price;
    }

    db.query('INSERT INTO orders SET ?', {tracking_number: trackingNumber, order_date: date, ship_method: defaultShippingMethod, number_of_products: numberOfProducts, price: price, userID: userID}, (error, results) => {
        if(error) {
            console.log(error);
            return next();
        } else {
            return next();
        }
    });
}


exports.getOrder = (req, res, next) => {
    let userID = req.user.userID;

    db.query('SELECT * FROM orders WHERE userID = ?', [userID], async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        } 

        if(result.length == 0) {
            return res.render('orderSummary', {
                message: 'You Have No Previous Orders'
            });
        } else {
            req.table = '<th scope="row">N/A</th><td>N/A</td><td>N/A</td><td>N/A</td>'
            req.order = result;
        } 
        return next();
    });
}

