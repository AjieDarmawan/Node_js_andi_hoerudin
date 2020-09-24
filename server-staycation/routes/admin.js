const router = require('express').Router();
const adminController = require('../controllers/adminController');

var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()

app.use(bodyParser.urlencoded({ extended: true }));


router.get('/logout', adminController.actionLogout);
router.get('/signin',adminController.viewSignIn);
router.post('/signin',adminController.actionSignIn);
router.get('/dashboard',adminController.viewDashboard);

router.get('/category',adminController.viewCategory);
router.get('/bank',adminController.viewBank);
router.get('/item',adminController.viewItem);
router.get('/booking',adminController.viewBooking);


//add
router.post('/category', adminController.addCategory);
router.post('/tambah_bank', adminController.tambahBank);
router.post('/tambah_item', adminController.tambahItem);


router.post('/edit_category', adminController.editCategory);
router.post('/edit_bank', adminController.editBank);
router.get('/edit_item/:id', adminController.editItem);
router.post('/edit_item_simpan', adminController.editItemSimpan);




router.post('/hapus_category/:id', adminController.hapusCategory);
router.post('/hapus_bank/:id', adminController.hapusBank);
router.post('/hapus_item/:id', adminController.hapusItem);






module.exports = router;