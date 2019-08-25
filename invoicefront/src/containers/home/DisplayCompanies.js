import React from 'react'


import './DisplayCompanies.style.scss'

const DisplayCompanies = (props) => {

	return(
		<div className="display-company-card">
			<div className="company-content">
				<div className="company-title">
					<h4>{props.companies.companyName}</h4>
				</div>
				<p> Send Invoices and do fun stuff </p>
				<button
					className="button-company"
					value={props.companies.id}
					variant="primary"
					onClick={props.redirectToCompPage}
				>
					Start
				</button>
			</div>					
		</div>

	)
}

export default DisplayCompanies

