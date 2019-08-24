import React from 'react'

import { Card, CardBody, CardHeader, Col,  FormGroup } from 'reactstrap'

import TextField from '@material-ui/core/TextField';

import InvoiceItem from '../../../components/invoice-item/invoiceItem.component'

import '../form.css'



const CompanyInformation = () => {

	return(
		<div className="mt-3 mb-15">
			<Col className="mb-10">
				<Card className="">
					<CardHeader className="header text-white font-weight-bold">Your Company Information</CardHeader>
					<CardBody>
						<FormGroup className="searchCustomer">
								<FormGroup className="form-inline mb-0">
								<CardBody>

										<FormGroup row className="my-0">
										<Col xs="6">
										<InvoiceItem className="left" text="Address" value="Töölöntorintie 11b37" />
										<InvoiceItem className="left" text="Phone Number" value="Töölöntorintie 11b37" />
										<InvoiceItem className="left" text="VAT Number" value="Töölöntorintie 11b37" />
										<InvoiceItem className="left" text="Contact Person" value="Töölöntorintie 11b37" />

										</Col>
										<Col xs="6">
										<InvoiceItem className="left" text="Customer's Name" value="FI9999999999999" />
										<form className="test" noValidate autoComplete="off">
												<TextField
													id="standard-name"
													label="Name"
													className="test"
													value="test"
													margin="normal"
												/>
										</form>
										</Col>

										
										</FormGroup>
										</CardBody>


								</FormGroup>
						</FormGroup>
					</CardBody>
				</Card>
			</Col>




		</div>
		
	)
}

export default CompanyInformation