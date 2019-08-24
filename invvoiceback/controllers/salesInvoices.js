const salesInvoiceRouter = require('express').Router()
const SalesInvoice = require('../models/salesInvoice')
const jwt = require('jsonwebtoken')



salesInvoiceRouter.get('/', async (req, res, next) => {
  const salesInvoices = await SalesInvoice.find({})
  res.json(salesInvoices.map(invoice => invoice.toJSON()))
})

//THE MODEL NEEDS QUITE ALOT MODIFICATIONS AND VALIDATIONS
//
salesInvoiceRouter.post('/', async ( req, res, next ) => {
  const body = req.body

  console.log(body)
  try{
    const newInvoice = new SalesInvoice({
      invoiceNumber: body.invoiceNumber,
      companyId: body.companyId,
      vatNumber: body.vatNumber,
      businessPartnerId: body.businessPartnerId,
      paymentTerm: body.paymentTerm,
      invoiceDate: body.invoiceDate,
      dueDate: body.dueDate,
      accountingDate: body.accountingDate,
      userCreatedBy: body.userCreatedBy,
      createdAtDateTime: body.createdAtDateTime,
      invoiceLines: 
        body.lines.map(item => item) 
      ,
      contactDetails: [
        {
          phoneNumber: body.contactDetails[0].phoneNumber,
          emailAddress: body.contactDetails[0].emailAddress
        }
      ]
    }) 

    const savedInvoice = await newInvoice.save()
    res.json(savedInvoice)
    
  }catch(exception){
    next(exception)
  }
})

module.exports = salesInvoiceRouter


