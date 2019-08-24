import React, { useState, useEffect } from 'react'


import businessPartnersServices from '../../services/businessPartners'
import InvoiceHeader from './invoiceHeader/invoiceHeader.js'
import InvoiceLine from './invoiceLine/invoiceLine'
import Controls from './controls/controls'

import SearchBusinessPartner from './searchBusinessPartner/searchBusinessPartner'
import CompanyInformation from './companyInformation/companyInformation'

import salesInvoiceServices from '../../services/salesInvoices'

import './form.css'



const CreateSalesInvoice = (props) => {
	const [ serachItem, setSearchItem ] = useState('')
	const [ businessPartners, setBusinessPartners]  = useState([])
	const [ businessPartnersItems, setBusinessPartnersItems ] = useState([])
	const [ businessPartner, setBusinessPartner ] = useState({
		id: '',
		businessPartnerName: '', 
		vatNumber: '',
		contactDetails:[{
			phoneNumber: '',
			emailAddress: ''
		}],
		addressDetails:[
			{
				streetName: '',
				cityName: '',
				postalCode: ''
			}
		]
	})

	const [ salesInvoice, setSalesInvoice ] = useState({
		invoiceNumber: '',
		companyId: '',
		vatNumber: '',
		businessPartnerId: '',
		paymentTerm: '',
		invoiceDate: new Date(),
		dueDate: new Date(),
		accountingDate: new Date(),
		userCreatedBy: '',
		createdAtDateTime: new Date(),
		contactDetails: [
			{
				phoneNumber: '',
				emailAddress: ''
			}
		],
		lines: [
      {
        lineDescription: '',
        priceWithoutVat: 0,
        quantity: 0,
        vatPct: 0,
        priceWithVat: 0,
        vatAmount: 0
      }
    ]
	})

	useEffect(() => {
		businessPartnersServices
		.getAll()
		.then(company => 
			setBusinessPartners(company)
		)
	}, [serachItem])


///SET THIS WORKING
	const saveInvoice = (e) => {
		e.preventDefault()
		setSalesInvoice({
			...salesInvoice, 
			businessPartnerId: businessPartner.id,
			vatNumber: businessPartner.vatNumber,
			companyId: window.localStorage.getItem('companyId'),
			contactDetails: [{
				phoneNumber: businessPartner.contactDetails[0].phoneNumber,
				emailAddress: businessPartner.contactDetails[0].emailAddress
			}]
		})
		
	}

	//sends the invoice into db
	const postSalesInvoice = async (e) => {
		e.preventDefault()
		// const newSalesInvoice = {
		// 	invoiceNumber: salesInvoice.invoiceNumber,
		// 	companyId: salesInvoice.companyId,
		// 	vatNumber: salesInvoice.vatNumber,
		// 	businessPartnerId: salesInvoice.businessPartnerId,
		// 	paymentTerm: salesInvoice.paymentTerm,
		// 	invoiceDate: salesInvoice.invoiceDate,
		// 	dueDate: salesInvoice.dueDate,
		// 	accountingDate: salesInvoice.accountingDate,
		// 	userCreatedBy: salesInvoice.userCreatedBy,
		// 	createdAtDateTime: salesInvoice.createdAtDateTime,

		// 	phoneNumber: salesInvoice.contactDetails[0].phoneNumber,
		// 	emailAddress: salesInvoice.contactDetails[0].emailAddress,

		// 	lineDescription: salesInvoice.lines.lineDescription,
		// 	priceWithoutVat: salesInvoice.lines.priceWithoutVat,
		// 	quantity: salesInvoice.lines.quantity,
		// 	vatPct: salesInvoice.lines.vatPct,
		// 	priceWithVat: salesInvoice.lines.priceWithVat,
		// 	vatAmount: salesInvoice.lines.vatAmount,

		// }
		try{
			await salesInvoiceServices.create(salesInvoice)
			console.log('success when adding a new sales invoice')

		}catch(exception){
			console.log(exception)
		}
	}


	return(
		<div className="container w-95">
			<SearchBusinessPartner  
				setBusinessPartnersItems={setBusinessPartnersItems}
				businessPartner={businessPartner}
				setBusinessPartner={setBusinessPartner}
				setSearchItem={setSearchItem}
				businessPartners={businessPartners}
				businessPartnersItems={businessPartnersItems}
			/>

			<InvoiceHeader 
				businessPartner={businessPartner}
				salesInvoice={salesInvoice}
				setSalesInvoice={setSalesInvoice}
			/>

			<InvoiceLine 
				salesInvoice={salesInvoice}
				setSalesInvoice={setSalesInvoice}
			/> 
			<CompanyInformation />
			<Controls 
				saveInvoice={saveInvoice}
				postSalesInvoice={postSalesInvoice}
			/> 
		</div>
	)
}

export default CreateSalesInvoice