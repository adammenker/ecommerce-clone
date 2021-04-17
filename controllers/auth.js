const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.register = (req, res) => {
    console.log(req.body);

    // destructuring
    const {name, email, password, passwordConfirm} = req.body;

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


exports.register = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !passowrd){
            return res.status(400).render('login', {
                message: 'Please provide a valid email and password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) =>{
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
            }
        });
    } catch (err){
        console.log(err);
    }
    

}