import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
 const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const history = useNavigate();

const handleSignUp=async(e)=>{
  e.preventDefault();
    // try{
      const data= await fetch("http://localhost:3000/api/signup",{
        method:"POST",
        body:JSON.stringify({
          username: username,
          password:password
        }),
          headers:{
            "Content-Type":"application/json"
          
        }
      })

        const result= await data.json();
      
        // localStorage.setItem("token",result.token);
        alert("Signup successful")
        history("/api/login");

}
  return (
    
    <div className='bg-red-200 text-center m-5'>
    <h1 className='text-3xl text-left  mx-10 mt-16'>Signup</h1>
  <form >
  
    <label htmlFor="username">Username</label>
    <br />
    <input type="text" name="username" id="username" placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
    <br />
    <br />
    <label htmlFor="password">Password</label>
    <br />
    <input type="password" name="password" id="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
    <br />
    <br />
    <button className='p-2 bg-red-300 rounded-lg m-2 text-black'  onClick={(e)=>handleSignUp(e)} type="submit">Signup</button>
<br/>
   <button onClick={()=>history('/api/login')}>Does not have account - Login {' '}</button>
  </form>
</div>
)
}
