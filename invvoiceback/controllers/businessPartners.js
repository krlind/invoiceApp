
const businessPartnerRouter = require('express').Router()
const BusinessPartner = require('../models/businessPartner')


businessPartnerRouter.get('/', async (req, res, next) => {
  const body = req.body

  try{
    const businessPartners = await BusinessPartner.find({ companyId: req.companyId})
    res.json(businessPartners.map(bp=> bp.toJSON()))
  }catch (exception) {
    next(exception)
  }

})

businessPartnerRouter.post('/', async (req, res, next) => {
  const body = req.body

  console.log(req)

  try {
    const newBusinessPartner = new BusinessPartner({
        companyId: body.companyId, 
        businessPartnerName: body.businessPartnerName,
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
            emailAddress: body.emailAddress
          }
        ]
    })
      const savedBusinessPartner = await newBusinessPartner.save()
      res.status(200).json(savedBusinessPartner)

  } catch (exception) {
    next(exception)
  }
})

module.exports = businessPartnerRouter



