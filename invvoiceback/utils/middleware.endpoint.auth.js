const jwt = require('jsonwebtoken')

const AccessRight = require('../models/accessRight')


//CHECKS THAT WHICH COMPANIES THE USER HAS ACESS TO 
const endpointAuth = async (req, res, next) => {
  console.log('hello')


  const decondedToken = await jwt.verify(req.token, process.env.SECRET)

  if(!req.token || !decondedToken.id ){
    return res.status(401).json({ error: 'token missing or invalid'})
  }

  console.log(decondedToken.id)

  const companiesUserHasAccess = await AccessRight.find({ userId: decondedToken.id })

  if(!companiesUserHasAccess){
    return res.status(401).json({ error: 'user does not have acces to the company'})
  }

  const companyIds = companiesUserHasAccess.map(comp => comp.companyId)

  if(!companyIds){
    return res.status(401).json({ error: 'user does not have acces to the company'})
  }

  console.log('user has access to', companyIds)
  
  req.companyIds = companyIds
  

  next()
}

module.exports = {
  endpointAuth
}