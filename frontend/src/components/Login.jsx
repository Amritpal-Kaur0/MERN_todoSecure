import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';


export default function Login() {
 
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const {login}=useAuth();
    const history = useNavigate();

    const handlelogin=async(e)=>{
      e.preventDefault();
      
        console.log("Before fetch");
          const data= await fetch("http://localhost:3000/api/login",{
            method:"POST",
            body:JSON.stringify({
              username: username,
              password:password
            }),
              headers:{
                "Content-Type":"application/json"
            },
          });
          console.log("after fetch");
          if(data.ok){
            const result= await data.json();
            console.log(result);
          
          login(result.token)
          alert("Login successful")
          console.log("Before navigate");
          history("/api/todos")
          console.log("after navigate");
      }else{
        alert("Invalid username or password");
      }

    }



  return (
    <div className='bg-red-200 text-center m-5'>
        <h1 className='text-3xl text-left  mx-10 mt-16'>Login</h1>
      <form >
      
        <label htmlFor="username">Username</label>
        <br />
        <input type="text" value={username} name="username" id="username" onChange={(e)=>{
        setUsername(e.target.value);
      }}  placeholder='Enter Username'  ></input>
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" value={password} name="password" onChange={(e)=>{
        setPassword(e.target.value);
      }} id="password" placeholder='Enter Password'  ></input>
        <br />
        <br />
        <button className='p-2 bg-red-300 rounded-lg m-2 text-black' type="submit" onClick={(e)=>handlelogin(e)}>Login</button>
<br/>
       <button onClick={()=>history('/')}>Does not have Account Signup Here {' '} </button>
      </form>
    </div>
  )
}


