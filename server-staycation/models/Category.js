const mongoose = require('mongoose');

const categorySchama = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Category',categorySchama)




