import {React, useState} from "react"
import "../styles/Login.css"
import Axios from 'axios'
import {useNavigate} from "react-router-dom"

function Login() {
  const [emailReg, setEmail] = useState("")
  const [passwordReg, setPassword] = useState("")

  const register = () => {
    const data = {email: emailReg, password: passwordReg}
    Axios.post("http://localhost:3002/register", data).then((response) => {
      console.log('nice', response)
      setEmail('')
      setPassword('')
    }).catch(e => {
      console.log(e)
    })
  }

  // const [username, logUsername] = useState("")
  const [email, logEmail] = useState("")
  const [password, logPassword] = useState("")
  const [loginStatus, setLoginStatus] = useState("")
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    
    const data = {email: email, password: password}
    // JSON-WEB-TOKEN
    Axios.post("http://localhost:3002/login", data).then((response) => {
      if (response.data.length > 0) {
        console.log(response)
        setLoginStatus('home')
        navigate('/about')
      }
      else{
        console.log(response)
        setLoginStatus("wrong email or password")
      }
    })
  }

  return (
    <div className= 'medeire'> 
      <div className='register'>
        <h1>Register</h1>
        <label htmlFor='email'></label>
        <input value={emailReg} type='text' onChange={(e) => {setEmail(e.target.value)}} 
        name='email' placeholder="Email" id='emailR' required></input>

        <label htmlFor='password'></label>
        <input value={passwordReg} type='text' onChange={(e) => {setPassword(e.target.value)}} 
        name='password' placeholder="Password" id='passwordR' required></input>

        <button type="submit" onClick={register}>Register</button>
      </div>

      <div className='login'>
        <h1>Login</h1>
        <label htmlFor='email'></label>
        <input value={email} type='text' onChange={(e) => {logEmail(e.target.value)}} 
        name='email' placeholder="Email" id='email' required></input>
        
        <label htmlFor='password'></label>
        <input value={password} type='text' onChange={(e) => {logPassword(e.target.value)}} 
        name='password' placeholder="Password" id='password' required></input>
        
        <button type="submit" onClick={login}>Login</button>
        <h1>{loginStatus}</h1>
      </div>
    </div>
  )
}

export default Login
