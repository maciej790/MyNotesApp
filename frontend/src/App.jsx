import { useEffect, useState } from 'react'
import { Routes, Route, Navigate   } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {

  const [userToken, setUserToken] = useState(localStorage.getItem('user'));

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("user", userToken);
    } else {
      localStorage.removeItem("user");
    }
  }, [userToken]);

  return(
    <>
     <Routes>
      <Route path="/" element={userToken ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
      <Route path="/dashboard" element={userToken ? <Dashboard setUserToken={setUserToken} /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={!userToken ? <SignIn setUserToken={setUserToken} /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!userToken ? <SignUp setUserToken={setUserToken}/> : <Navigate to="/dashboard" />} />
    </Routes>
    </>
  )

}

export default App
