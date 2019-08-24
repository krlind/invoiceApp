import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import businessPartnersServices from '../../services/businessPartners'

// import { useForm } from '.../hooks/hooks.js'


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

		console.log(customerObject)
		try{
			await businessPartnersServices.create(customerObject)
			console.log('success when adding new customer')
		
		}catch(exception){
			console.log('error when adding new customer')
			console.log(exception)
		}
	}

	//container w-75 border border-dark"
	return(
		<div className="container w-50 mt-20">
			<div className="">
			<h1 className="text-center h4 mb-4">Create a new Customer</h1>
			<hr/>
			<Form >
				<Form.Group className="w-80">
					<Form.Label>Offical Company Name</Form.Label>
					<Form.Control 
						type="text" 
						name="companyName"
						placeholder="Enter the Offical Company Name"
						value={newCompany.companyName} 
						onChange={onChange}
					/>
				</Form.Group>

				<div className="d-flex justify-content-center">
					<Form.Row className="w-100 d-flex justify-content-center" >
						<Form.Group className="w-75">
							<Form.Label>Business Registration Number</Form.Label>
							<Form.Control 
								type="text" 
								name="brn"
								placeholder="Enter Business Registration number" 
								onChange={onChange}
								value={newCompany.brn}
							/>
						</Form.Group>

						<Form.Group className="bg-secondary">
							<Button variant="primary" type="submit" onClick={onPrhSubmit}>
								Import from PRH
							</Button>
						</Form.Group>
					</Form.Row>
				</div>

				<div className="d-flex justify-content-center">
					<Form.Row className="w-100" >
						<Form.Group className="w-50 ">
							<Form.Label>Phone number</Form.Label>
							<Form.Control 
								type="text" 
								placeholder="Enter Phone Number" 
								name="phoneNumber"
								onChange={onChange}
								value={newCompany.phoneNumber}
							/>
						</Form.Group>
						<Form.Group className="w-50">
							<Form.Label>Email Address </Form.Label>
							<Form.Control 
								type="text" 
								placeholder="Enter Emaill Address" 
								name="emailAddress"
								onChange={onChange}
								value={newCompany.emailAddress}
							/>
						</Form.Group>
					</Form.Row>
				</div>

				<Form.Group className="w-100">
					<Form.Label>Street Name</Form.Label>
					<Form.Control 
							type="text" 
							placeholder="Enter Street Name" 
							name="streetName"
							value={newCompany.streetName}
							onChange={onChange}

					/>
				</Form.Group>

				<div className="d-flex justify-content-center">
					<Form.Row className="w-100">
						<Form.Group className="w-50">
							<Form.Label>City Name</Form.Label>
							<Form.Control 
								type="text" 
								placeholder="Enter City Name" 
								name="cityName"
								value={newCompany.cityName}
								onChange={onChange}

							/>
						</Form.Group>

						<Form.Group className="w-50">
							<Form.Label>Postal Code</Form.Label>
							<Form.Control 
								type="text" 
								placeholder="Enter Postal Code" 
								name="postalCode"
								onChange={onChange}
								value={newCompany.postalCode}
							/>
						</Form.Group>
					</Form.Row>
				</div>

				<Button 
					variant="btn btn-primary btn-lg btn-block mt-2" 
					type="submit"
					onClick={addNewCustomer}
				>
					Add a New Customer
				</Button>
		</Form>
		</div>
	</div>
	)
}

export default CreateCustomer