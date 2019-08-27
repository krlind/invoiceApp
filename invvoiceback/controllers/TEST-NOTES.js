const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const redis = require('redis');


const loginRouter = require('express').Router()
const User = require('../models/user')

// const redis = require('redis')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } =  request.body
  try{
   await handleSingnIn(username, password)

    console.log('-------after sign in')
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  }
  catch(exception){
    next(exception)
  }
})

const handleSingnIn =  async (username, password) => {

  if( !username || !password ){
    throw new Error( 'invalidFormSubmission' )
  }

  try{
    const user = await User.findOne({ username: username })

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      throw new Error( 'authFailed'  )
    }

  }catch(exception){
    next(exception)
}}



module.exports = loginRouter
