const mongoose=require("mongoose");


const connection=()=> {
    try{
   mongoose.connect('mongodb://127.0.0.1:27017/todoshere');
  console.log("Connected to mongo");
    }
    catch(err){
        console.log(err);
    }
}
module.exports=connection;




