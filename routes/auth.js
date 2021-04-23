const express = require("express");
const authController = require('../controllers/auth');
const router = express.Router();


router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);


const cartController = require('../controllers/cart');

router.get('/checkout', authController.isLoggedIn, cartController.createOrder, (req, res) => {
    if(req.user){
        res.render('checkout', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }  
});



module.exports = router;