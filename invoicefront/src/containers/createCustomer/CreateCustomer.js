import React, { useState } from 'react'



import businessPartnersServices from '../../services/businessPartners'

import './CreateCustomer.style.scss'

import TexinputComponent from '../../components/inputs/textInput.component'


const CreateCustomer = (props) => {
	const [ newCompany , setNewCompany ] = useState({
		companyName: '', 
		brn: '',
		phoneNumber: '',
		emailAddress: '',
		streetName: '',
		cityName: '',
		postalCode: ''
	})

	const onChange = (e) => {
		setNewCompany({...newCompany,  [e.target.name]: e.target.value })
	}

	const onPrhSubmit = (e) => {
		e.preventDefault()
		fetchDataFromPrh()	
	}

	const fetchDataFromPrh =  async () => {
		try{
			const response = await fetch(`https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0&businessId=${newCompany.brn}`)
			const data = await response.json() 
			const prhAdrs = data.results[0].addresses.filter(adr => adr.endDate === null && adr.type === 2)

			const prhResponse = {
				companyName: data.results[0].name, 
				brn: data.results[0].businessId,
				phoneNumber: '',
				emailAddress: '',
				streetName: prhAdrs[0].street,
				cityName: prhAdrs[0].city,
				postalCode: prhAdrs[0].postCode
			}	
			setNewCompany(prhResponse)
		} catch(err){
			console.log(err)
		}
	}

	const addNewCustomer = async (e) => {
		e.preventDefault()

		const customerObject = {
			companyId: window.localStorage.getItem('companyId'),
			businessPartnerName: newCompany.companyName,
			vatNumber: newCompany.brn,
			phoneNumber: newCompany.phoneNumber,
			emailAddress: newCompany.emailAddress,
			countryName: 'dummy country',
			cityName: newCompany.cityName,
			streetName: newCompany.streetName,
			postalCode: newCompany.postalCode,
		}

		try{
			await businessPartnersServices.create(customerObject)
			console.log('success when adding new customer')
		
		}catch(exception){
			console.log('error when adding new customer')
			console.log(exception)
		}
	}


	return(
    <div className="new-customer-form">
			<div className="form-items">	

      <h2>Create a new Customer</h2>

      <TexinputComponent
        className="form-item-customer"
        text="Offical Company Name"  
        name="companyName"
        value={newCompany.companyName} 
        onChange={onChange}
      />
      <div className="customer-prh-row">
        <TexinputComponent
          text="Business Registration Number"  
          name="brn"
          value={newCompany.brn} 
          onChange={onChange}
        />

        <button 
          className="button-customer-prh"
          type="submit" 
          onClick={onPrhSubmit}>
          Import from PRH
        </button>
      </div>
      <h4>Contact Details</h4>
    
      <TexinputComponent
          text="Phone number"  
          name="phoneNumber"
          value={newCompany.phoneNumber} 
          onChange={onChange}
      />

      <TexinputComponent
          text="Email Address"  
          name="emailAddress"
          value={newCompany.emailAddress} 
          onChange={onChange}
      />
      <h4>Address Details</h4>
   
      <TexinputComponent
        text="Street Name"  
        name="streetName"
        value={newCompany.streetName} 
        onChange={onChange}
      />

      <TexinputComponent
        text="City Name"  
        name="cityName"
        value={newCompany.cityName} 
        onChange={onChange}
      />

      <TexinputComponent
        text="Postal Code"  
        name="postalCode"
        value={newCompany.postalCode} 
        onChange={onChange}
      />

      <button 
          className="button-customer-submit"
          type="submit"
          onClick={addNewCustomer}
        >
          Add a New Customer
      </button>
	
		</div>
	</div>
	)
}

export default CreateCustomer