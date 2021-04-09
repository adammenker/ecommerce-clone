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

module.exports = router;