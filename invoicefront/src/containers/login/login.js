import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField';
import './login.styles.scss'

import loginServices from '../../services/login'

const Login = (props) => {
  const [ user, setUser ] = useState({ username: '', password:'' })

  console.log(props)

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
    <div className="login-form">
    <form onSubmit={handleLogin}>

    <h4>Login into the Invoice App</h4>
 
    <div className="login-form-items">
      <TextField
        id="standard-name1"
        className="login-item"
        label="Enter Username"
        type="text"
        name="username" 
        value={user.username}
        onChange={onChange}
        margin="dense"
      />
      

    <TextField
        id="standard-name2"
        className="login-item"
        type="password"
        label="Enter Password"
        name="password" 
        value={user.password}
        onChange={onChange}
        margin="dense"
      />
    </div>

    <button type="submit">login</button>
    </form>

    </div>
  )
}

export default Login 