import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
 
import './App.css'
import { useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';


  function App() {
  const [todos,setTodos]=useState([])
  const {token}=useAuth();
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  
 
  const data = async()=>{
    
      if ( token && token.length>2){
        try{
       const res=await fetch("http://localhost:3000/api/todos",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        'Authorization': `Bearer ${token}`,
       }
      })
  const data= await res.json();
  // console.log(data.todos);
  setTodos(data.todos);
  setLoading(false);
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }else{
    // alert("Please login first");
    setLoading(false);
    history("/api/login");
  }
};

useEffect(()=>{
    data();
  },[token])

  const handleCreated=()=>{
    data();
  }


  return (
    //  <Router>
     <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/api/login" element={<Login/>}/>
      <Route path="/api/todos" element={  loading ?( <div>loading...</div>):([<CreateTodo onTodoCreated={handleCreated} />, <Todos todos={todos}/>] )
      }/>

    
     </Routes>
    //  </Router>
     
  )
};


export default App