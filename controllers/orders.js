const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});

// creates payment too
exports.createOrder = (req, res, next) => {

    

    userID = req.user.userID;
    reqValues = req.body.values
    reqValues = reqValues.split(",");

    let price;
    // aggregate function
    db.query('SELECT SUM(p.price) FROM cart c, products p WHERE c.userID = ? AND c.productID = p.productID', [userID], (error, results) => {
        if(error) {
            console.log(error);
            return next();
        } else {
            
            console.log(results[0]);
            console.log(results[Object.keys(results)[0]]);
            price = results[Object.keys(results)[0]];
        }
        // remove
        return next();
    });


    // price = parseFloat(reqValues[0].replace("$", ""));
    // shippingCarrier = reqValues[2];
    // creditCardNumber = reqValues[3];
    // numberOfProducts = parseInt(reqValues[1]);
    // let trackingNumber = (Math.round(100000000 * Math.random())).toString();

    price *= 1.08;
    if(shippingCarrier = "USPS"){
        price += 5.99
    } else if(shippingCarrier = "UPS") {
        price += 9.99
    } else if(shippingCarrier = "Fedex") {
        price += 11.99
    }

    // let currentDate = new Date();
    // let cDay = currentDate.getDate();
    // let cMonth = currentDate.getMonth() + 1;
    // let cYear = currentDate.getFullYear();
    // let date = cMonth + "/" + cDay + "/" + cYear;

    // let defaultShippingMethod = "USPS Priority Mail";
    
    // if(numberOfProducts == 0) {
    //     return res.render('cart', {
    //         message: 'You have no items in your cart'
    //     });
    // }

    // db.query('INSERT INTO orders SET ?', {tracking_number: trackingNumber, order_date: date, ship_method: shippingCarrier, number_of_products: numberOfProducts, price: price, userID: userID}, (error, results) => {
    //     if(error) {
    //         console.log(error);
    //         return next();
    //     } else {
    //         return next();
    //     }
    // });

    // db.query('INSERT INTO payment SET ?', {card_number: creditCardNumber}, (error, results) => {
    //     if(error) {
    //         console.log(error);
    //         return next();
    //     } else {
    //         return next();
    //     }
    // });
}


exports.getOrder = (req, res, next) => {
    if(req.user) {
        let userID = req.user.userID;

        db.query('SELECT * FROM orders WHERE userID = ?', [userID], async (error, result) => {
            if(error) {
                console.log(error);
                return next();
            } 

            if(result.length == 0) {
                return res.render('orders', {
                    message: 'You Have No Previous Orders'
                });
            } else {
                req.orders = generateOrderHtml(result);
            } 
            return next();
        });
    } else {
        next();
    }
}


function generateOrderHtml(orders) {
    let ordersArray = [];
    for(let i = 0; i < orders.length; i++){
        ordersArray.push(orders[i].order_number);
        // replace character string with a .env so no injections
        ordersArray.push(orders[i].tracking_number); // replaced characters reference on generateCart.js line 31
        ordersArray.push(orders[i].order_date);
        ordersArray.push(orders[i].ship_method);
        ordersArray.push(orders[i].number_of_products);
        ordersArray.push(orders[i].price);
        ordersArray.push("\\");
    }
    return ordersArray;
}
