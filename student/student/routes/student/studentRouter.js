const express = require('express');
const router = express.Router();
const StudentController  = require('../../controllers/students/StudentController');

 router.get('/student-list',StudentController.getIndex);

module.exports = router;