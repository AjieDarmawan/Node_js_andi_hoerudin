const express = require('express');
const router = express.Router();
const StudentController  = require('../../controllers/students/StudentController');

 router.get('/student-list',StudentController.getIndex);

 router.get('/student-list/add',StudentController.getStudentAdd);
 router.post('/student-add',StudentController.PostAddStudent);
 router.post('/student-edit',StudentController.PostEditStudend);
 router.post('/student-delete',StudentController.deleteStudent);

 router.get('/student-list/:student', StudentController.getEditStudent);



module.exports = router;