const tes_koneksi = require('@hyoga/mysql');




//use mysql database
const mysql = require('mysql');
var multer = require('multer');
var path          = require('path');

const models = require('../models/index');
 
// //konfigurasi koneksi
// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'stay_cation_nodejs',
//   multipleStatements:true,  
// });

//  
// //connect ke database
// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });

const inst = new tes_koneksi({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stay_cation_nodejs',
  port: 3306,
});


const bodyParser = require('body-parser');
const session = require('express-session');
var express = require('express');
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())

var flash = require('connect-flash');
app.use(flash());


module.exports = {



    viewSignIn:async(req,res) => {

     


      try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        if (req.session.user == null || req.session.user == undefined) {
          res.render('index', {
            alert,
            title: "Staycation | Login"
          });
        } else {
        
          res.redirect('/admin/dashboard');
        }
      } catch (error) {
        res.redirect('/admin/signin');
      }
      
    },

    actionSignIn:async(req,res) => {

     


      var username = req.body.username;
      var password = req.body.password;
     
      if (username && password) {


        const users = await inst.table('users').where({ username: username , password:password }).select();
        console.log(users);


        if(users.length > 0){
              req.session.user = {
              id: true,
              username: username
            }

            res.redirect('/admin/dashboard');
        }
        // conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password],
        //  function(error, results, fields) {

        //   //console.log(results);

        //   // if (results.length > 0) {

        //   //   // const alertMessage =  req.flash('alertMessage', 'Success Berhasil Login');
        //   //   // const alertStatus  =  req.flash('alertStatus', 'success');
        //   //   // const alert = {message:alertMessage,status:alertStatus};

        
        //   //   req.session.user = {
        //   //     id: true,
        //   //     username: username
        //   //   }

        //   //   res.redirect('/admin/dashboard');

      
        //   //   // res.render('admin/dashboard/view_dashboard',{
        //   //   //   //alert: alert,
        //   //   //   title: 'Staycation | Dashboard',
        //   //   // });
  
            
        //   //   // res.redirect('/admin/dashboard');
        //   // } else {
        //   //   req.send('Incorrect Username and/or Password!');
        //   // }			
        //  // req.end();
        // });
      } else {
        req.send('Please enter Username and Password!');
        req.end();
      }
    },

    viewDashboard: (request,response) => {

      if (request.session.user) {
       // response.send('Welcome back, ' + request.session.username + '!');
       response.render('admin/dashboard/view_dashboard');
      } else {
        response.redirect('/admin/signin');
      }
      //response.end();
        


    },

    actionLogout: (req, res) => {
      req.session.destroy();
      res.redirect('/admin/signin');
    },

    viewCategory: async(req,res) => {

      const results = await inst.table('category').select();
      console.log(results);

     
      res.render('admin/category/view_category',{
            results: results
          });

        // let sql = "SELECT * FROM category";
        // let query = conn.query(sql, (err, results) => {
        //   if(err) throw err;
        //   res.render('admin/category/view_category',{
        //     results: results
        //   });
        // });
       // res.render('admin/category/view_category');
    },
    viewBank:async (req,res) => {
      
      
      const results = await inst.table('bank').select();
      console.log(results);

     
      res.render('admin/bank/view_bank',{
            results: results
          });


      // let sql = "SELECT * FROM bank";
      // let query = conn.query(sql, (err, results) => {
      //   if(err) throw err;
      //   res.render('admin/bank/view_bank',{
      //     results: results
      //   });
      // });
        
    },
    viewItem:async(req,res) => {

      const category = await inst.table('category').select();

      const results =   inst.table('item').alias('i').field([ 'i.*', 'c.*' ]).join({
        category: {
          as: 'c',
          on: { id_category: 'id' }
        }
       }).select();

      console.log(results);

     
      res.render('admin/item/view_item',{
        category: category,
        item:results,
      });


      // var sql = 'SELECT * FROM category; SELECT i.*,c.name FROM item as i inner join category as c on c.id = i.id_category;';
      // let query = conn.query(sql,[1, 2], (err, results) => {
      //   if(err) throw err;


      //   res.render('admin/item/view_item',{
      //     category: results[0],
      //     item:results[1],
      //   });
      // });
       // res.render('admin/item/view_item');
    },
    viewBooking: (req,res) => {
        res.render('admin/booking/view_booking');
    },



    
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
       console.log(name);


       let data = {name: req.body.name};
       let sql = "INSERT INTO category SET ?";
       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;

         req.flash('message', 'Success Add Category');
         req.flash('alertStatus', 'success');
         res.redirect('/admin/category');
       });

      

      //  req.flash('alertMessage', 'Success Add Category');
      //  req.flash('alertStatus', 'success');

    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/category');
    }
  },


  editCategory: async (req, res) => {
    try {
      const { name } = req.body;
       console.log(name);

       let data = {name: req.body.name};
       let sql = "UPDATE category SET name='"+req.body.name+"' WHERE id="+req.body.id;
       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/category');
       });


     // await Category.create({ name });
    //   req.flash('alertMessage', 'Success Add Category');
    //   req.flash('alertStatus', 'success');
    //   res.redirect('/admin/category');
    } catch (error) {
    //   req.flash('alertMessage', `${error.message}`);
    //   req.flash('alertStatus', 'danger');
      res.redirect('/admin/category');
    }
  },

  hapusCategory: async (req, res) => {
    try {
      const { id } = req.body;
       console.log(id);

       let data = {id: req.body.id};
       let sql = "DELETE FROM category WHERE id="+req.body.id+"";
       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/category');
       });


     // await Category.create({ name });
    //   req.flash('alertMessage', 'Success Add Category');
    //   req.flash('alertStatus', 'success');
    //   res.redirect('/admin/category');
    } catch (error) {
    //   req.flash('alertMessage', `${error.message}`);
    //   req.flash('alertStatus', 'danger');
      res.redirect('/admin/category');
    }
  },

  

  tambahBank: async (req, res) => {


    const storage = multer.diskStorage({
      destination : path.join(__dirname + './../public/images/'),
      filename: function(req, file, cb)
      {

          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          //cb(null, file.fieldname);
      
      }
  });

    const upload = multer({
        storage : storage
    }).single('image');

    upload(req, res, err => {
      if (err) throw err

     console.log(req.file.filename);

      let data = {nama_bank: req.body.nama_bank,
        no_rekening: req.body.no_rekening,
        name: req.body.name,
        gambar: req.file.filename+ '-' + Date.now()
      };

      // let data = {nama_bank: "tes",
      //   no_rekening: 123,
      //   name: "12s",
      //   gambar: "sa"
      // };

       console.log(data);

       let sql = "INSERT INTO bank SET ?";

       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/bank');
       });

     
   });


  },

  hapusBank: async (req, res) => {
    try {
      const { id } = req.body;
       console.log(id);

       let data = {id: req.body.id};
       let sql = "DELETE FROM bank WHERE id="+req.body.id+"";
       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/bank');
       });


     // await Category.create({ name });
    //   req.flash('alertMessage', 'Success Add Category');
    //   req.flash('alertStatus', 'success');
    //   res.redirect('/admin/category');
    } catch (error) {
    //   req.flash('alertMessage', `${error.message}`);
    //   req.flash('alertStatus', 'danger');
      res.redirect('/admin/bank');
    }
  },


  editBank: async (req, res) => {
    try {
      const { name } = req.body;
       console.log(name);

       let data = {name: req.body.name};
       let sql = "UPDATE bank SET name='"+req.body.name+"', no_rekening='"+req.body.no_rekening+"', nama_bank='"+req.body.nama_bank+"' WHERE id="+req.body.id;
       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/bank');
       });


     // await Category.create({ name });
    //   req.flash('alertMessage', 'Success Add Category');
    //   req.flash('alertStatus', 'success');
    //   res.redirect('/admin/category');
    } catch (error) {
    //   req.flash('alertMessage', `${error.message}`);
    //   req.flash('alertStatus', 'danger');
    res.redirect('/admin/bank');
    }
  },


  tambahItem: async (req, res) => {

    const storage = multer.diskStorage({
      destination : path.join(__dirname + './../public/images/'),
      filename: function(req, file, cb)
      {

          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          //cb(null, file.fieldname);
      
      }
  });

    const upload = multer({
        storage : storage
    }).single('image');

    upload(req, res, err => {
      if (err) throw err

     //console.log(req.file.filename);

      let data = {
        title: req.body.title,
        price: req.body.price,
        city: req.body.city,
        id_category:req.body.id_category,
        image: req.file.filename+ '-' + Date.now(),
        deskripsi:req.body.desc,
      };

      // let data = {nama_bank: "tes",
      //   no_rekening: 123,
      //   name: "12s",
      //   gambar: "sa"
      // };

       //console.log(data);

       let sql = "INSERT INTO item SET ?";

       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/item');
       });

     
   });


  },

  hapusItem: async (req, res) => {
    try {
      const { id } = req.body;
       console.log(id);

       let data = {id: req.body.id};
       let sql = "DELETE FROM item WHERE id="+req.body.id+"";
       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/item');
       });


     // await Category.create({ name });
    //   req.flash('alertMessage', 'Success Add Category');
    //   req.flash('alertStatus', 'success');
    //   res.redirect('/admin/category');
    } catch (error) {
    //   req.flash('alertMessage', `${error.message}`);
    //   req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },

  editItem: async (req, res) => {

      
   // console.log('tes');
    // try {
    //   //const { id } = req.body;
       var id  = req.params.id;
    

       var sql = 'SELECT * FROM category; SELECT * FROM item where id='+id+'';

      

       let query = conn.query(sql,[1, 2], (err, results) => {

        
         if(err) throw err;

         //console.log(results[1]);
         res.render('admin/item/item_edit',{
          category: results[0],
          results: results[1],
          
          id:id,

        
    
        });

        

     


       
       });


    //  // await Category.create({ name });
    // //   req.flash('alertMessage', 'Success Add Category');
    // //   req.flash('alertStatus', 'success');
    // //   res.redirect('/admin/category');
    // } catch (error) {
    // //   req.flash('alertMessage', `${error.message}`);
    // //   req.flash('alertStatus', 'danger');
      //res.redirect('/admin/item');
    // }
  },

  

  editItemSimpan: async (req, res) => {

    const storage = multer.diskStorage({
      destination : path.join(__dirname + './../public/images/'),
      filename: function(req, file, cb)
      {

          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          //cb(null, file.fieldname);
      
      }
  });

    const upload = multer({
        storage : storage
    }).single('image');

    upload(req, res, err => {
      if (err) throw err

     //console.log(req.file.filename);

      let data = {
        title: req.body.title,
        price: req.body.price,
        city: req.body.city,
        id_category:req.body.id_category,
        image: req.file.filename+ '-' + Date.now(),
        desc:req.body.desc,
      };

      // let data = {nama_bank: "tes",
      //   no_rekening: 123,
      //   name: "12s",
      //   gambar: "sa"
      // };

       //console.log(data);

       //let sql = "INSERT INTO item SET ?";

       let sql = "UPDATE item SET title='"+req.body.title+"', price='"+req.body.price+"'"+
       ",city='"+req.body.city+"',id_category='"+req.body.id_category+"',image='"+req.file.filename+ '-' + Date.now()+"'"+
       ",deskripsi='"+req.body.desc+"' WHERE id="+req.body.id;

       let query = conn.query(sql, data,(err, results) => {
         if(err) throw err;
         res.redirect('/admin/item');
       });

     
   });


  },


}