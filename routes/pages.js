const express = require("express");
const authController = require('../controllers/auth');
const cartController = require('../controllers/cart');
const router = express.Router();


router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('profile', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }   
});

router.get('/cart', authController.isLoggedIn, cartController.getCart, (req, res) => {
    // const products = cartController.getCart();
    if(req.user && req.products) {
        console.log("* both user and products");
        res.render('cart', {
            user: req.user,
            products: req.products
        });
    } else if(req.user){
        console.log("* just user");
        res.render('cart', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }  
});

module.exports = router;