const mongoose = require('mongoose')
// const usermdl=require('./usermodel')

const issuedBookSchema = new mongoose.Schema({
    user:{
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref:'users'
    },
    book:{
        // type:mongoose.Schema.Types.ObjectId,
        type: String,
        // ref:'books'
    },
    issuedBy:{
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref:'users'
    },
    issuedAt:{
        type:Date,
    },
    returnedAt:{
        type:Date
    },
    isReturned:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true,versionKey:false
})
const issuedbookdata= mongoose.model('issuedBook',issuedBookSchema)
module.exports =issuedbookdata;