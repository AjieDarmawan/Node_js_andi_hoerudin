const mongoose = require('mongoose');

const imageSchama = new mongoose.Schema({

    imageUrl:{
        type:String,
        required:true,

    }
})

module.exports = mongoose.model('Image',imageSchama)




