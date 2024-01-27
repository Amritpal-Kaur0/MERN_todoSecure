const mongoose =require('mongoose');

const UserSchema=new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
TodosCreated:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Todo'
}]
},{
    timestamps:true
})

const User=mongoose.model('User',UserSchema);
module.exports={User};