import {useEffect, useState} from 'react'
import Logout from './Logout';

export default function CreateTodo() {
  const [title,setTitle]=useState(" ");
  const [description,setDescription]=useState(" ");

const createTodo=async({onTodoCreated})=>{
  const token=localStorage.getItem("token");
  try{
   fetch("http://localhost:3000/api/todo",{
      method:"POST",
      body:JSON.stringify({
        title: title,
        description:description
      }),
        headers:{
          "Content-Type":"application/json",
          'Authorization': `Bearer ${token}`,
      }
    }).then(async function(res){
      const json= await res.json();
      alert("Todo added")
onTodoCreated();
    })
  }catch(err){
    console.log(err);
  }
}




  return (
    <div className='bg-red-200 text-center m-5 relative'>
      <Logout/>
        <h1 className='text-3xl text-left  mx-10 mt-16'>Create Todo</h1>
    <div className='h-50 text-white bg-gray-500 text-center mx-5 mt-10'>  
      <label htmlFor="title">Title</label>
      <br />
      <input className='text-black' type="text" name=" title" id="title" onChange={(e)=>{
        setTitle(e.target.value);
      }} placeholder='Enter Title'></input>
      <br />
      <br />
      <label htmlFor="description">Description</label>
      <br /> 
      <input className='text-black' type="text" name="description" id="description" onChange={(e)=>{
        setDescription(e.target.value);}} 
        placeholder='Enter Description'></input>
      <br />
      <br /> 
<button className='p-2 bg-red-300 rounded-lg m-2 text-black' onClick={createTodo}>Create Todo</button>
     
    </div>
    </div>
  )
}
