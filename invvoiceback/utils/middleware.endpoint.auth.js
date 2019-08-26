const jwt = require('jsonwebtoken')

const AccessRight = require('../models/accessRight')


//CHECKS THAT WHICH COMPANIES THE USER HAS ACESS TO 
const endpointAuth = async (req, res, next) => {
  console.log('END POINT AUTH FOR NEW COMPANY CREATION ONLY')
  console.log('-------------------------------------')

  try{
    const decondedToken = await jwt.verify(req.token, process.env.SECRET)

    if(!req.token || !decondedToken.id ){
      throw new Error( 'tokenError'  )
    }
  
    const companiesUserHasAccess = await AccessRight.find({ userId: decondedToken.id })
  
    if(!companiesUserHasAccess){
      throw new Error( 'userUnauthorized'  )
    }
  
    const companyIds = companiesUserHasAccess.map(comp => comp.companyId)
  
    if(!companyIds){
      throw new Error( 'userUnauthorized'  )
    } else{
      console.log(`user has access to`, companyIds)
      req.companyIds = companyIds
    }
  
  }catch(exception){
    next(exception)
  }
  next()
}

module.exports = {
  endpointAuth
}