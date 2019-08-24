import React from 'react'

import { Card, CardBody, CardHeader, Col,  FormGroup } from 'reactstrap'





const Control = (props) => {

	return(
		<div className="mt-3 mb-15">
			<Col className="mb-10">
				<Card className="">
					<CardHeader className="header text-white font-weight-bold">Controls </CardHeader>
					<CardBody>
						<FormGroup className="searchCustomer">
								<FormGroup className="form-inline mb-0">
								<CardBody>

										<FormGroup row className="my-0">
										<button type="submit" onClick={props.saveInvoice}>Save Invoice</button>
										<button type="submit" onClick={props.postSalesInvoice}>Post Invoice</button>
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

export default Control
