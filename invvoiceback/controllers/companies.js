const companiesRouter = require('express').Router()
const Company = require('../models/company')
const AccessRight = require('../models/accessRight')
const jwt = require('jsonwebtoken')

// const accesRights = require('../utils/accesRights');



/* REFACTOR THIS
//IDEA is to make a middleware that 
 1. recieves a userID
 2. request the accessRights Table
 3. Returns the companyID that the user has access to
*/

// const findCompanyCodesForUser = async (userID) => {
// 	console.log(userID)
// 	// search for acceess rights
// 	const companiesUserHasAccess = await AccessRight.find({userId: userID})

// 	const companyIds = companiesUserHasAccess.map(comp => comp.companyId)
// 	return companyIds
	
// }



companiesRouter.get('/', async (req, res, next) => {
	console.log('hello get')
	try{
		//verify token
		// const decondedToken = jwt.verify(req.token, process.env.SECRET)
	

		// if(!req.token || !decondedToken.id ){
		// 	return res.status(401).json({ error: 'token missing or invalid'})
		// }

		// const companyIds = await findCompanyCodesForUser(decondedToken.id)

		// console.log(companyIds)
		console.log('comp', req.companyIds)

		const companyIds = await req.companyIds

		const companies = await Company.find({_id: companyIds})
		res.json(companies.map(company => company.toJSON()))

	
	} catch (exception) {
		next(exception)
	}
})

// companiesRouter.get('/:id', async (req, res, next) => {
//   const companies = await Company.findOne({ _id: req.params.id })
//   res.json(companies.toJSON())
// })

companiesRouter.post('/', async (req, res, next) => {
	//ONLY USER TAHT HAVE ACCESS SHOULD BE ABLE TO SEE THIS INFORMATION	
	// PUT A RESTRICTION THAT ONE USER CAN HAVE ACCESS TO 10 companies -- ihan läpäl
	// poista turhat id 
	const body = req.body

  try {

		const decondedToken = jwt.verify(req.token, process.env.SECRET)
		if(!req.token || !decondedToken.id){
			return res.status(401).json({ error: 'token missing or invalid'})
		}

		const newCompany = new Company({
			companyName: body.companyName,
			vatNumber: body.vatNumber,
			addressDetails: [
				{
					countryName: body.countryName,
					cityName: body.cityName,
					streetName: body.streetName,
					postalCode: body.postalCode
				}
			],
			contactDetails: [
				{
					phoneNumber: body.phoneNumber,
					contactPersonName: body.contactPersonName
				}
			],
			bankDetails: [
				{
					bankAccountNumber: body.bankAccountNumber,
					bankAccountOwnerName: body.bankAccountOwnerName,
					BankName: body.BankName,
					bicSwift: body.bicSwift
				}
			]
		})

		const savedComapny = await newCompany.save()
		
		
		const savedCompanyId = savedComapny.id

		//CREATE ADMIN RIGHTS FOR THE USER WHO CREATED THE COMPANY
		//THE ACCCES RIGHT MODEL IS VALIDATING THESE
		const newAccessRights = new AccessRight({
			companyId: savedCompanyId,
			userId: decondedToken.id,
			accessType: body.role === undefined ? 'admin' : body.role, 
			createdBy: decondedToken.id
	
		})
		const accessRights = await newAccessRights.save()
		res.json(accessRights)

  } catch (exception) {
  		next(exception)
  }
})

module.exports = companiesRouter