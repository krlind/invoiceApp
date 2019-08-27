const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Access = require('../models/accessRight')

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);

loginRouter.post('/', async (request, response, next ) => {
  const { username, password } =  request.body

  try{
    if( !username || !password) {
      throw new Error( 'invalidFormSubmission')
    }

    const user = await User.findOne({ username: username })

    if(user === null ){
      throw new Error( 'userUnauthorized')
    } 

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if ( !passwordCorrect ) {
      throw new Error( 'userUnauthorized')
    }

    const accessDetails =  await getAccesRights(user._id)
  
    const userForToken = {
      username: user.username,
      id: user._id
      // accessDetails: accessDetails
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    const tokenCheck = await sendAccessRightsToRedis(token, accessDetails)

    console.log(tokenCheck)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })

  } catch(e){
    next(e)
  }
})

const getAccesRights = async (userId) => {
  const companies =  await Access.find({ userId: userId })
  const userHasAccessTo = companies.map( (item) => {
    let personObject = Object.assign( { userId: item._id, accessRights: item.accessType }); 
    return personObject
  })
  return userHasAccessTo
}

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));


// HERE THE 
const sendAccessRightsToRedis = (token, accessDetails) => {
    const jwtPayload = { accessDetails };
    const accessToken = jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '30'});
    // Promise.resolve(redisClient.set(key, value))
    return setToken(accessToken, token )
    .then(() => {
      return { success: 'true' }
    })
    .catch(console.log);

}


module.exports = loginRouter
