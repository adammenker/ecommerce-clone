const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


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
            let productNames = [];
            for(let i = 0; i < result.length; i++) {
                productNames.push(result[i].name);
            }
            
            let test = {t: "<h1>a</h1>"};
            let scr = {s: "<script>console.log('a');</script>"};

            req.test = test;
            req.script = scr;
            console.log(productNames);
        } 
        return next();
    });
}


