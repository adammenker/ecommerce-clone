const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "us-cdbr-east-03.cleardb.com",
    user: "b04903d33dd1c0",
    password: "d17038e0",
    database: "heroku_ce5d691c17f624d"
});


exports.register = (req, res) => {
    // destructuring
    const {firstname, lastname, phone, email, password, passwordConfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {

        if(error) {
            console.log(error);
        } 

        if(results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if(firstname.length == 0) {
            return res.render('register', {
                message: 'An First Name is required'
            });
        } else if(lastname.length == 0) {
            return res.render('register', {
                message: 'An Last Name is required'
            });
        } else if(email.length == 0) {
            return res.render('register', {
                message: 'An Email is required'
            });
        } else if(password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }  else if(password.length == 0) {
            return res.render('register', {
                message: 'A Password is required'
            });
        } else if(isNaN(parseInt(phone)) || phone.length != 10) {
            return res.render('register', {
                message: 'Enter a 10 digit number for your phone number'
            });
        }  


        let hashedPasword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO users SET ?', {firstname: firstname, lastname: lastname, phone: phone, email: email, password: hashedPasword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                return res.render('register', {
                    successMessage: 'User Registered'
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
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if(results.length == 0 || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
            } else {
                const id = results[0].userID;
                // replace string with process.env.JWT_SECRET
                const token = jwt.sign({id}, "TEMPprocess.env.JWT_SECRET", {
                    expiresIn: "90d"// replace number with process.env.JWT_EXPIRES_IN
                });

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

exports.isLoggedIn = async (req, res, next) => {
    if(req.cookies.jwt){
        try{
            // verify token and associated user
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                "TEMPprocess.env.JWT_SECRET",
            );

            // check for user in DB by querying for userID
            db.query('SELECT * FROM users WHERE userID = ?', [decoded.id], (error, result) => {
                if(result.length == 0){
                    return next();
                }
                req.user = result[0];
                return next();
            });
        } catch(error){
            console.log(error);
            return next();
        }
    } else {
        next();
    } 
}


exports.logout = async (req, res) => {
    // overwrites isLoggedIn cookie and then new cookies expires 2 seconds later
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}