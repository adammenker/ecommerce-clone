const express = require("express");
const authController = require('../controllers/auth');
const cartController = require('../controllers/cart');
const ordersController = require('../controllers/orders');
const productsController = require('../controllers/products');
const router = express.Router();


router.get('/', authController.isLoggedIn, productsController.insertAutofillScript, (req, res) => {
    res.render('index', {
        user: req.user,
        products: req.productNames
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
    if(req.user && req.products) {
        res.render('cart', {
            user: req.user,
            products: req.products
        });
    } else if(req.user){
        res.render('cart', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }  
});

router.post('/orderSummary', authController.isLoggedIn, ordersController.createOrder, ordersController.getOrder, (req, res) => {
    if(req.user && req.price) {
        res.render('orderSummary', {
            user: req.user,
            price: req.price
        });
    } else if(req.user){
        res.render('cart', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    } 
});



module.exports = router;