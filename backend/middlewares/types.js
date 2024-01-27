const zod=require('zod');
const jwt=require('jsonwebtoken');
const e = require('express');

 const createTodo=zod.object({
    title:zod.string(),
    description:zod.string()
 })

 const updateTodo=zod.object({
    _id:zod.string(),
 })

const createUser=(req,res,next)=>{
 const {username,password}=req.body;
 const CheckUser=zod.string().min(6).max(20,{message:"Username must be between 6 and 20 characters"});
 const CheckPass=zod.string().min(6,{message:"Password must be atleast 6 characters long"});

 try{
      CheckUser.parse(username);
      CheckPass.parse(password);
      
      next()
; }
   catch(err){
      res.status(400).json({err,msg:"Invalid Username or Password"});
   }
}

const userMiddleware=(req,res,next)=>{
   const authHeader=req.headers.authorization;
   if(authHeader){
   const token=req.headers.authorization.split(" ")[1];
   const decodedToken=jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
      if(err){
         res.status(401).json({err,msg:"Invalid Token"});
      }
      req.username=decodedToken;
      next();
   });
   }else{
      res.status(401).json({msg:"No Token Provided/User not logged in"});
}
};


 module.exports=
 {
    createTodo,
    updateTodo,
    createUser,
    userMiddleware
}
