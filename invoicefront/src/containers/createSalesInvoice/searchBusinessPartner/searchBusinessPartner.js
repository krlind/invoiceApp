import React from 'react'

import { Button, Card, CardBody, CardHeader, Col,  FormGroup, Label, Input  } from 'reactstrap'

import DispalyBusinessPartner from './displayBusinessPartner.js'


import '../form.css'


const SearchBusinessPartner = (props) => {


	const displaySearchResults = (value) => {
		const results = props.businessPartners.filter(bp => 
			bp.businessPartnerName.toLowerCase().includes(value)
		)
		if( results.length === 0 && value.length > 2 ){
			console.log('no such name exist')
			return null
		} else if( value.length > 2 ){
			props.setBusinessPartnersItems(results)
		}
	}

	const onChange = (e) => {
		e.preventDefault()
		props.setSearchItem(e.target.value.toLowerCase())
		displaySearchResults(e.target.value.toLowerCase())
	}

	

	return(
		<Col className="mb-10">
		<Card className="">
			<CardHeader className="header text-white font-weight-bold">Create a new sales invoice</CardHeader>
			<CardBody>
				<FormGroup className="searchCustomer">
					<Label>Enter a Customer's Name</Label>
						<FormGroup className="form-inline mb-0">
							<Input 
								className="p-2 flex-fill" 
								type="text" 
								placeholder="Search for Customer by name"
								onChange={onChange}
								value={props.serachItem}
							/>
							<Button type="submit" >
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
								</svg>
							</Button>
						</FormGroup>
						<FormGroup className="w-95">	
						{
							props.businessPartnersItems.map(bp => 
								<DispalyBusinessPartner 
									key={bp.id}
									businessPartners={bp}
									setBusinessPartnersItems={props.setBusinessPartnersItems}
									businessPartner={props.businessPartner}
									setBusinessPartner={props.setBusinessPartner}
								/>
							)
						}
						</FormGroup>
				</FormGroup>
			</CardBody>
		</Card>
	</Col>
	)
}

export default SearchBusinessPartner
