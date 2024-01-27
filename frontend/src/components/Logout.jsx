import {useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const {logout}=useAuth();
    const history = useNavigate();
    const handlelogout=()=>{
      logout();
       history("/api/login")
    }

  return (
    <div>
      <button className=' absolute  right-7 bg-red-400 px-5 py-3 rounded-lg m-2' onClick={handlelogout}>Logout</button>
    </div>
  )
}
