
const businessPartnerRouter = require('express').Router()
const BusinessPartner = require('../models/businessPartner')


businessPartnerRouter.get('/', async (req, res, next) => {
  const businessPartners = await BusinessPartner.find({})
  res.json(businessPartners.map(bp=> bp.toJSON()))
})

businessPartnerRouter.post('/', async (req, res, next) => {
  const body = req.body
  console.log(body)
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
      res.json(savedBusinessPartner)

  } catch (exception) {
    next(exception)
  }
})

module.exports = businessPartnerRouter



