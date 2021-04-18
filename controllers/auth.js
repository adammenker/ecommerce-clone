const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
console.log('\n\n\n\uuuuuuuuu,bkjdsa\n\n\n\n');


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


exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).render('login', {
                message: 'Please provide a valid email and password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) =>{
            console.log(results);
            if(results.length == 0 || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
            }else {
                const id = results[0].id;

                const token = jwt.sign({id}, "TEMPprocess.env.JWT_SECRET", {
                    expiresIn: "90d"// replace number with process.env.JWT_EXPIRES_IN
                });

                console.log(`token: ${token}`);

                // insert process.env.JWT_COOKIE_EXPIRES where "1" is in multiplication
                const cookieOptions = {
                    expires: new Date(
                        Date.now + 1 * 24 * 60 * 60 * 1000
                    ), 
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            } 
        });
    } catch (err){
        console.log(err);
    }
    

}