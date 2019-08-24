import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

import './displayBusinessPartner.css'


const DisplayCompanies = (props) => {

  const selectedBusinessPartner = (e) =>{
    let businessPartnerSelected = Object.assign({}, props.businessPartners)
    props.setBusinessPartner(businessPartnerSelected)
    props.setBusinessPartnersItems([])
  }

	return(
    <ListGroup className="search-itmes mt-0 mb-0">
      <ListGroup.Item 
        value={props.businessPartners.id}
        action onClick={selectedBusinessPartner}
      >
        {props.businessPartners.businessPartnerName}</ListGroup.Item>
    </ListGroup>
	)
}

export default DisplayCompanies


