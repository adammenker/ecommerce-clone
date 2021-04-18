const express = require("express");

const router = express.Router();


router.get('/', (req, res) => {
    try{
        res.render('index');
    } catch(error){
        console.log(error);
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;