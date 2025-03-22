import React from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = ({setUserToken}) => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('user');
    setUserToken(null);
    navigate("/signin");
  }

  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard