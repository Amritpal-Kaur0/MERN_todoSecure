const express = require('express');
const app =express();
const cors=require("cors")
const  PORT=3000;
const dotnev = require("dotenv");
const todoRoute=require('./routes/todo.js');
const UserRouter=require('./routes/user.js');
const connection=require('./db/db.js');

connection();

dotnev.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/api',todoRoute);
app.use('/api',UserRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: '404 - Not Found' });
});

//Listening Server
app.listen(PORT ,()=>{
console.log(`Port is running on ${PORT}`)
 })