const mongoose = require('mongoose')

const linesSchema = 	
  {
    lineDescription: { type: String },
    priceWithoutVat: { type: Number },
    quantity: { type: Number },
    vatPct: { type: Number },
    priceWithVat: { type: Number },
    vatAmount: { type: Number },
  }

const salesInvoiceSchema = mongoose.Schema({
  invoiceNumber: { type: Number },
  companyId: { type: String },
  vatNumber: { type: String },
  businessPartnerId: { type: String },
  paymentTerm: { type: String },
  invoiceDate: { type: String },
  dueDate: { type: String },
  accountingDate: { type: String },
  userCreatedBy: { type: String },
  createdAtDateTime: { type: String },
  invoiceLines: [linesSchema], 
	contactDetails: [
		{
			phoneNumber: { type: String },
			emailAddress: { type: String }
		}
	]
})


salesInvoiceSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const SalesInvoice = mongoose.model('SalesInvoice', salesInvoiceSchema)

module.exports = SalesInvoice