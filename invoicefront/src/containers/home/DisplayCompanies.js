import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const DisplayCompanies = (props) => {

	return(
		<div className="d-inline-block">
				<Jumbotron className="text-center m-3">
					<h4>{props.companies.companyName}</h4>
					<hr/>
					<p> Send Invoices and do fun stuff </p>
					<p>
						<Button 
							value={props.companies.id}
							variant="primary"
							onClick={props.redirectToCompPage}
						>
							Start
						</Button>
					</p>
				</Jumbotron>
		</div>
	)
}

export default DisplayCompanies
