const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const busPartnerSchema = mongoose.Schema({
  companyId: { type: String },
	businessPartnerName: { type: String, minlength: 3},
  vatNumber: { type: String },
	addressDetails: [
		{
      countryName: { type: String },
			streetName: { type: String },
			cityName: { type: String },
			postalCode: { type: String }
		}
	],
	contactDetails: [
		{
			phoneNumber: { type: String },
			emailAddress: { type: String }
		}
	]
})

busPartnerSchema.plugin(uniqueValidator)

busPartnerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const BusinessPartner = mongoose.model('BusinessPartner', busPartnerSchema)

module.exports = BusinessPartner