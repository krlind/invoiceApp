const jwt = require('jsonwebtoken')

const AccessRight = require('../models/accessRight')


//CHECKS THAT THE USER HAS ACCESS FOR THE COMPANY CODE
// THIS MIDDLEWARE SHOULD BE USED BEFORE EACH COMPANY RELATED REQUEST
const validateAccessForComapnyCode = async (req, res, next) => {
  console.log('COMPANY CODE AUTORIZATION')
  console.log('-------------------------------------')

  try{
    const authorization = req.get('authorization')
    
    let token 
  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
    } else {
      throw new Error( 'tokenError' )
    }
    
    const decondedToken = await jwt.verify(token, process.env.SECRET)

    if(!req.token || !decondedToken.id ){
      throw new Error( 'tokenError' )
    }

    let companyID 

    if ( req.headers.companyid === undefined && req.body.companyId === undefined ){
      throw new Error( 'badRequest' )
    } else if ( req.headers.companyid === undefined) {
      companyID = req.body.companyId 
    } else {
      companyID = req.headers.companyid 
    }
  
    const companiesUserHasAccess =  await AccessRight.find({ userId: decondedToken.id, companyId: companyID })
  
    if(companiesUserHasAccess.length === 0){
      throw new Error( 'userUnauthorized'  )
    } else{
      req.userId = decondedToken.id 
      req.companyId = companyID

      console.log(`user has access to`, companyID)
      console.log('--------------------------------')
    }

  }catch(exception) {
    next(exception)
  }
  next()
}

module.exports = {
  validateAccessForComapnyCode
}

