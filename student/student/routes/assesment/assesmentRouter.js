const express = require('express');
const router = express.Router();
const assesmentController  = require('../../controllers/assesment/assesmentController');

router.get('/assessment',assesmentController.getIndex);
router.get('/assessment/add',assesmentController.getAsessmentAdd);
router.post('/assessment-add',assesmentController.PostAsessmentAdd);
router.post('/assessment-edit',assesmentController.PostEditAsessment);
router.post('/assessment-delete',assesmentController.getAsessmentDelete);

router.get('/assessment-edit/:assessment', assesmentController.getEditAssesment);


module.exports = router;
