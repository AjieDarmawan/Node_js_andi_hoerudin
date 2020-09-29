const User = require('../../models/user/userModel');
var bcrypt = require('bcryptjs');

exports.getRegister=(req,res,next)=>{
    res.render('login/register',{
        pageTitle: 'Register',
        path     : '/register'
    })
}

exports.getIndex=(req,res,next)=>{

    console.log(req.session.isLogedin);
    res.render('login/index',{
        pageTitle: 'Login',
        path     : '/login'
    })
}

exports.postLogin=(req,res,next)=>{
    req.session.isLogedin = true;
    res.redirect('/home');
}

exports.PostRegister=(req,res,next)=>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    User.findAll({
        where:({email:email}),
        attributes: ['id', 'name', 'email', 'password'],
    }).then((UserDoc)=>{

        if(UserDoc.length > 0){
            return res.redirect('/register');
        }

        bcrypt.hash(password,12).then(hashpassword=>{
            const user = User.create({
                name:name,
                email:email,
                password:hashpassword,
            })
    
            return user;
        });

            

       


    }).then(user=>{
            return res.redirect('/home')
    }) 
    
    
    .then((err)=>{
        console.log(err);
    })

}