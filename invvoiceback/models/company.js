const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const companySchema = mongoose.Schema({
	companyName: { type: String, unique: true, minlength: 3},
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
			contactPersonName: { type: String }
		}
	],
	bankDetails: [
		{
      bankAccountNumber: { type: String },
      bankAccountOwnerName: { type: String },
      BankName: { type: String },
      bicSwift: { type: String },
		}
	],
	accessDetails: [
		{
      userId: { type: String },
      role: { type: String }
		}
	]
})

companySchema.plugin(uniqueValidator)

companySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company