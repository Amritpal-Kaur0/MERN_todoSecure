const { Router } = require("express");
const {createTodo,updateTodo,userMiddleware} = require("../middlewares/types");
const router = Router();
// const jwt=require('jsonwebtoken');
// const bcrypt=require('bcrypt');
const {Todo}=require('../models/todo.models');
const {User}=require('../models/user.models');
// const zod=require('zod');

router.post('/todo',userMiddleware,async(req,res)=>{
  const createPayload=req.body;
  const parsePayload=createTodo.safeParse(createPayload);
  if(!parsePayload.success){
        res.status(411).json({
          msg:"You sent the wrong inputs",
        })
        return;
  }
//find User
const foundUser=await User.findOne({username:req.username.username})
 if(!foundUser){
     res.status(400).json({msg:"Error finding user"})
     return;
 }

//put it in mongo
const newTodo=await Todo.create({
   title:createPayload.title,
   description:createPayload.description,
    createdBy:foundUser._id,
})
foundUser.TodosCreated.push(newTodo);
foundUser.save();

res.send(newTodo);
})

 
//get all todos from all users
router.get('/todos',userMiddleware,async(req,res)=>{
 const todos= await Todo.find({});
    if(!todos){
    res.status(400).json({msg:"Error getting Todos"});
    return;
  }
  res.json({todos:[...todos]});
});

router.put('/completed',userMiddleware,async(req,res)=>{
    const updatePayload=req.body;
    const parsePayload=updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
          res.status(411).json({
            msg:"You sent the wrong inputs",
          })
          return;
    }
  //find user 
    const foundUser=await User.findOne({username:req.username.username});
    // console.log(foundUser);
    if(!foundUser){
        res.status(400).json({msg:"Error finding user"})
        return;
    }
 
   //update todo
   const updatedTodo=await Todo.findOneAndUpdate({
     _id:req.body._id,
      createdBy:foundUser._id
     },
     {
      completed:true
     },
     {
       new:true
     }
   )
    if(!updatedTodo){
      res.status(400).json({msg:"You can only update your own todo"})
      return;
    }
res.json({msg:"Todo updated",updatedTodo});
 })

 //delete todo
router.delete('/:id',userMiddleware,async(req,res)=>{
  try{
  //find user
   const foundUser= await User.findOne({
    username:req.username.username})

  if(!foundUser){
    res.status(400).json({msg:"Error finding user"})
    return;
  }

  if(!foundUser.TodosCreated.includes(req.params.id)){
    res.status(400).json({msg:"You can only delete your own todo"})
    return;
  }
  foundUser.TodosCreated.pull(req.params.id);
  foundUser.save();
  await Todo.findByIdAndDelete(req.params.id);

res.json({msg:"Todo deleted"});

}catch(err){
  res.status(400).json({msg:"Error deleting todo"});
}
})


 module.exports = router;