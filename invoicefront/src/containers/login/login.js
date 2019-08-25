import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import Button from '@material-ui/core/Button';
import './login.styles.scss'

import loginServices from '../../services/login'


const Login = (props) => {
  const [ user, setUser ] = useState({ username: '', password:'' })


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userDetails')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const onChange = (e) => {
		setUser({ ...user,  [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const loginUser = await loginServices.login({
        username: user.username,
        password: user.password
      })
      setUser(loginUser)

      console.log(loginUser)
      
      window.localStorage.setItem(
        'userDetails', JSON.stringify(loginUser)
      )

      props.history.push("/home")

    }catch(expection){
      console.log('Error', expection)
    }
  }
  
  return(
    <div className="login-container">
      <div className="form-container">
        <div className="login-form">

          <form onSubmit={handleLogin}>

          <DeveloperModeIcon className="login-logo"/> 

          <h4>Sign in with your
            <br/>
          <span> Email</span>
          </h4>

          <div className="login-form-items">
            <TextField
              className="login-item"
              label="Enter Username"
              type="text"
              name="username" 
              value={user.username}
              onChange={onChange}
              margin="normal"
            />
            
            <TextField
                className="login-item"
                type="password"
                label="Enter Password"
                name="password" 
                value={user.password}
                onChange={onChange}
                margin="normal"
              />
            </div>

          

            <button className="button" type="submit">Login</button>
            </form>
            <div className="footer-options">
                <h6>Forgot Password?</h6>
                <h6>Create Account?</h6>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Login 