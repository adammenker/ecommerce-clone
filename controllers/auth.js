const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.register = (req, res) => {
    console.log(req.body);

    // destructuring
    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {

        if(error) {
            console.log(error);
        } 

        if(results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if(password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPasword = await bcrypt.hash(password, 8);
        console.log(hashedPasword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPasword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User Registered'
                });
            }
        });


    });

}