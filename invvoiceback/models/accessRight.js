const  mongoose = require('mongoose')

const accessRightsSchema = mongoose.Schema({
  companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'companies'}, 
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  accessType: { type: String}, 
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

accessRightsSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Accessrights = mongoose.model('Accessrights', accessRightsSchema)

module.exports = Accessrights