import React from 'react'

		

const CompanyHomePage = (props) => {

  console.log(props.match.params.id)


    const path = props.match.params.id

		return (
			<div className="company-home-page">
          <h1> company homepage </h1>
          <button onClick={()=> props.history.push(`/createCustomer/${path}`)	}>Create Customer!</button>
          <button onClick={()=> props.history.push(`/createSalesInvoice/${path}`)	}>Create Customer!</button>
			</div>
		);
	}

export default CompanyHomePage