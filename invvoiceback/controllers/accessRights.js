const accessRightsRouter = require('express').Router();
const AccessRight = require('../models/accessRight');

const jwt = require('jsonwebtoken')

//GET
accessRightsRouter.get('/', async (req, res, next) => {
  try{
    const accessRights = await AccessRight.find({})
    res.json(accessRights.map(rights => rights.toJSON()))
  }catch(exception){
    console.log(exception)
  }
})

//POST
accessRightsRouter.post('/', async (req, res, next) => {

  const body = req.body
  
  try {
    const decondedToken = jwt.verify(req.token, process.env.SECRET)
		if(!req.token || !decondedToken.id){
			return res.status(401).json({ error: 'token missing or invalid'})
    }
        
    //THE ACCCES RIGHT MODEL IS VALIDATING THESE
		const newAccessRights = new AccessRight({
      companyId: body.companyId,
      userId: body.userId,
      accessType: body.accessType,
      createdBy: body.createdBy
  
		})
		const accessRights = await newAccessRights.save()
		res.json(accessRights)

  } catch (exception) {
  		next(exception)
  }
})

module.exports = accessRightsRouter

