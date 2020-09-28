const express = require('express');
const router = express.Router();
const HomeController  = require('../../controllers/home/HomeController');

 router.get('/',HomeController.getIndex);
 router.get('/home',HomeController.getIndex);

module.exports = router;