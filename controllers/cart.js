const mysql = require("mysql");
const { promisify } = require("util");
const { util } = require("webpack");

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
    if(req.user) {
        let userID = req.user.userID;
        db.query('SELECT productID FROM cart WHERE userID = ?', [userID], async (error, result) => {
            if(error) {
                console.log(error);
                return next();
            } else if (result.length == 0){
                req.message = "There are no items in you cart."
                return next();
            }

            let productIDsArray = [];
            for(let i = 0; i < result.length; i++) {
                productIDsArray.push(result[i].productID);
            }

            // await getCartProductsArray(productIDsArray);
            let products = [];
            
            let fakeCount = 0;
            function test1(){
                console.log('** ' + fakeCount);
                console.log('* ' + (productIDsArray.length - 1));
                let productID = productIDsArray[fakeCount];
                db.query('SELECT * FROM products WHERE productID = ?', [productID], async (error, result) => {
                    // console.log(result);
                    
                    products.push(result[0]);
                    if(error) {
                        console.log(error);
                        return next();
                    } 
                    if(fakeCount == productIDsArray.length - 1){
                        // productNames = generateCartHtml(products);
                        console.log('final hit');
                        req.products = generateCartHtml(products);
                        console.log(req.products);
                        return next();
                    } 
                    console.log('hit ' + fakeCount);
                    fakeCount++;
                });
                
            } 

            const myAsync = promisify(test1);

            async function test2() {
                await myAsync();
            }


            for(let i = 0; i < productIDsArray.length; i++){
                  test2();
            }

            // for(let i = 0; i < productIDsArray.length; i++){
            //     console.log('** ' + i);
            //     let productID = productIDsArray[i];
            //     db.query('SELECT * FROM products WHERE productID = ?', [productID], async (error, result) => {
            //         // console.log(result);
                    
            //         products.push(result[0]);
            //         if(error) {
            //             console.log(error);
            //             return next();
            //         } 
            //         if(i == productIDsArray.length - 1){
            //             // productNames = generateCartHtml(products);
            //             req.products = generateCartHtml(products);
            //             console.log(req.products);
            //             return next();
            //         } 
            //     });
            // }
        });
    } else {
        return next();
    }
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


exports.emptyCart = (req, res, next) => {
    let userID = parseInt(req.user.userID);
    db.query('DELETE FROM cart WHERE userID = ?', [userID], async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        }
        return next();
    });
}

exports.removeItemFromCart = (req, res, next) => {
    let userID = parseInt(req.user.userID);
    let productID = req.body.removeItemProductId;
    db.query('DELETE FROM cart WHERE userID = ? and productID = ?', [userID, productID], async (error, result) => {
        if(error) {
            console.log(error);
            return next();
        }
        return next();
    });
}


exports.addToCart = (req, res, next) => {
    try{
        console.log(req.user.userID);
        let product = (req.body.addToCartButton).split("**2Z$*4TZQ$**3");
        req.product = {name: product[0],description: product[1],price: product[2],image: product[3], productID: product[4]};
        console.log(product);
        db.query("INSERT INTO cart (userID,productID) values (?,?)", [req.user.userID, product[4]], async (error, result) => {
            console.log('in query');
            if(error) {
                console.log(error);
                return next();
            }
            return next();
        });    
    } catch(error){
        console.log(error);
        return next();
    }
}