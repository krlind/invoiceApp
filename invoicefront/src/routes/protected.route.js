import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const loggedUserJSON = window.localStorage.getItem('userDetails')

  return(
    <Route
      { ...rest }
      render={props => {
        if ( loggedUserJSON ) {
          return <Component { ...props } />
        }else{
          return <Redirect to={
            {
              pathname: "/Login",
              state: {
                from: props.location
              }
            }
          }
          />
        }}
      }
    />
  )
}

export default ProtectedRoute