const express = require('express');

const router= express.Router();

const registerController = require('../../controllers/login/registerController');


//register
router.get('/register',registerController.getRegister);
router.post('/postRegister',registerController.PostRegister);

//login
router.get('/',registerController.getIndex);
router.post('/login',registerController.postLogin);

module.exports=router;