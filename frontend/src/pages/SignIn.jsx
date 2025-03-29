import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";



const SignIn = ({setUserToken}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async (e) =>{
        e.preventDefault();
        const url = 'http://localhost:3000/auth/signIn';
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password 
                }),
            })
            const data = await response.json();
            if(response.status != 200){
                setMessage(data);
            }else{
                sessionStorage.setItem('user', JSON.stringify(data))
                setUserToken(data);
                navigate('/dashboard');
            }
            
        }catch(e){
            setMessage(`error: ${e}`);
        }
    }  

  return (
    <div>
        <h2>Sign in form</h2>
        <form onSubmit={handleSignIn} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Zaloguj się
        </button>
      </form>
        {message}
    </div>
  )
}

export default SignIn