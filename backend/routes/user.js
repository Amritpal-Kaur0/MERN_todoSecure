const {Router}=require('express');
const router=Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {createUser, userMiddleware}=require('../middlewares/types');
const {User}=require('../models/user.models');



router.post('/signup',createUser,async(req,res)=>{
 const {username,password}=req.body;
//  console.log(username,password);
 const hashedpassword= await bcrypt.hash(password,10);
 const newUser= await User.create({username:username,password:hashedpassword});
 if(!newUser){
    res.status(400).send("Error Signing Up")
 }else{
    res.status(200).send(newUser).json({message:"User Created Successfully"});
 }
})

router.post('/login',async(req,res)=>{
    try{
    const {username,password}=req.body;
    const findUser=await User.findOne({username:username});
    if(!findUser || !( await bcrypt.compare(password,findUser.password))){
        res.status(400).json({message:"User does not exist or Password is incorrect"});
    }else{
        const myToken=jwt.sign({username},process.env.SECRET);
    //   localStorage.setItem('token',myToken);
        res.status(200).json({token:myToken})
    }
}catch(err){
    console.log(err);
}
});

router.get('/info',userMiddleware,async(req,res)=>{
     const findInfo= await User.findOne({username:req.username.username}).populate('TodosCreated')
     console.log(findInfo);
        if(!findInfo){
            res.status(400).json({message:"Error getting Todos"});
        }else{
            res.status(200).json({UserInfo:findInfo});
        }
    })



router.get('/logout',(req,res)=>{
    

    res.status(200).json({message:"Logged Out Successfully"});
})

module.exports=router;