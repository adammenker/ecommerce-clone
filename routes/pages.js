const express = require("express");
const authController = require('../controllers/auth');
const cartController = require('../controllers/cart');
const ordersController = require('../controllers/orders');
const productsController = require('../controllers/products');
const router = express.Router();


router.get('/', authController.isLoggedIn, productsController.insertAutofillScript, productsController.getAllProducts, (req, res) => {
    res.render('index', {
        user: req.user,
        products: req.productNames,
        allProducts: req.allProducts
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
            user: req.user,
            message: req.message
        });
    } else {
        res.redirect('/login');
    }  
});

router.post('/cart', authController.isLoggedIn, cartController.removeItemFromCart, cartController.getCart, (req, res) => {
    console.log(req.user);
    res.render('cart', {
        user: req.user,
        products: req.products,
        message: req.message
    });
});

router.post('/orders', authController.isLoggedIn, ordersController.createOrder, cartController.emptyCart, ordersController.getOrder, (req, res) => {
    if(req.user && req.orders) {
        res.render('orders', {
            user: req.user,
            orders: req.orders
        });
    } else if(req.user){
        res.render('cart', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    } 
});

router.get('/orders', authController.isLoggedIn, ordersController.getOrder, (req, res) => {
    if(req.user){
        res.render('orders', {
            user: req.user,
            orders: req.orders
        });
    } else {
        res.redirect('/login');
    } 
});


router.post('/product', authController.isLoggedIn, productsController.getProduct, cartController.addToCart, (req, res) => {
    if(req.product && req.user){
        res.render('product', {
            user: req.user,
            product: req.product,
        });
    } else if(req.message){
        res.render('product', {
            noProductFoundMessage: req.message
        });
    }
});


router.post('/displayProducts', authController.isLoggedIn, (req, res) => {
    console.log(req.body);
    res.render('displayProducts', {
        // allProducts: req.allProducts
    });
});


module.exports = router;