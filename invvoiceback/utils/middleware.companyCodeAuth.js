const jwt = require('jsonwebtoken')

const AccessRight = require('../models/accessRight')


//CHECKS THAT THE USER HAS ACCESS FOR THE COMPANY CODE
// THIS MIDDLEWARE SHOULD BE USED BEFORE EACH COMPANY RELATED REQUEST
const validateAccessForComapnyCode = async (req, res, next) => {

  console.log('validated hello')

  console.log('compID', req.headers.companyid)

  try{
    const authorization = req.get('authorization')

    if(!authorization){
      return res.status(401).json({ error: 'token missing or invalid'})
      
    }
    
    let token 
  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
    } else {
      return res.status(401).json({ error: 'token missing or invalid'})
    }
    
    console.log('validated hello 2') 

    const decondedToken = await jwt.verify(token, process.env.SECRET)
  
    if(!req.token || !decondedToken.id ){
      return res.status(401).json({ error: 'token missing or invalid'})
    }
  
    console.log(decondedToken.id)

    // const companiesUserHasAccess =  await AccessRight.find({ userId: decondedToken.id, companyId: req.body.companyId })

    let companyID 

    if ( req.headers.companyid === undefined && req.body.companyId === undefined ){
      return res.status(401).json({ error: 'no valid companyId in the request'})
    } else if ( req.headers.companyid === undefined) {
      companyID = req.body.companyId 
    } else {
      companyID = req.headers.companyid 
    }
  
    const companiesUserHasAccess =  await AccessRight.find({ userId: decondedToken.id, companyId: companyID })
  
    if(companiesUserHasAccess.length === 0){
      return res.status(401).json({ error: 'user does not have access to the company'})
    } else{
      req.userId = decondedToken.id 
      req.companyId = companyID
    }

  
  
  
    console.log('user has acceess to requested company code!!', companiesUserHasAccess)
    


  }catch(error) {
    res.status(401).json({ error: 'user does not have access to the company'})
  }



  next()
}

module.exports = {
  validateAccessForComapnyCode
}

