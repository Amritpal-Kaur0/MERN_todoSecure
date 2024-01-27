import { useState } from "react";


 const Todos=({todos})=> {


   const MarkDone=async(todo)=>{

   await fetch(`http://localhost:3000/api/completed`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({_id:todo.id})
  }).then((res)=>{
    const json=  res.json();
    console.log(json);
    window.location.reload();
   
  }).catch((err)=>{
    console.log(err);
  })  

}
  return (
    <>
     <h1 className="text-3xl text-left  mx-10 mt-16">Todos</h1>
  <div className="w-88 h-screen flex flex-wrap align-center justify-center bg-gray-400">
   
    {todos.map(function(todo){
      return (<div className="w-40  bg-yellow-400 m-5 h-fit rounded-xl text-center container" key={todo._id}>
        <h3 className="text-lg mt-5 p-5">{todo.title}</h3>
        <h4 className="m-1">{todo.description}</h4>
       <button onClick={()=>MarkDone(todo)} className={"p-2 rounded-lg bg-slate-200"}>{todo.completed==true? "Completed ✅":"Mark as Done "}</button>
      </div>
      )
    })}
      
    </div>
    </>
  )
}

export default Todos
