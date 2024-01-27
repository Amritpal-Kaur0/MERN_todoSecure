const mongoose = require('mongoose')

const TodoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    }
    })
    
    
    const Todo= mongoose.model('Todo', TodoSchema)
    module.exports ={Todo}