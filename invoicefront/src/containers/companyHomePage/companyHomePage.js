import React from 'react'
import './companyHomePage.style.scss'


import ActionCard from '../../components/actionCards/actionCards'
		

const CompanyHomePage = (props) => {


    const routesData = [
      {
        routeName: 'createACustomer',
        routeDesciption: 'Create a new Customer',
        path: '/CustomerMasterData',
        routeType: 'actions',
        domain: 'customer'
      }, 
      {
        routeName: 'displayCustomers',
        routeDesciption: 'Display Customers',
        path: '/CustomerMasterData',
        routeType: 'actions',
        domain: 'customer'
      }, 
      {
        routeName: 'createSalesInvoice',
        routeDesciption: 'Create Sales Invoice',
        path: '/createSalesInvoice',
        routeType: 'actions',
        domain: 'salesInvoice'
      }, 
      {
        routeName: 'createPurchaseInvoice',
        routeDesciption: 'Create Purchase Invoice',
        path: '/createPurchaseInvoice',
        routeType: 'actions',
        domain: 'purchase'
      }, 
      {
        routeName: 'changeCompanySettings',
        routeDesciption: 'Change Company Settings',
        path: '/createPurchaseInvoice',
        routeType: 'actions',
        domain: 'purchase'
      }, 
    ]


		return (
			<div className="page-container">

        <div className="page-item">	
          <h1> Company Name </h1>
          <hr/>
          <div className="page-dashboard">Here should be a dashboard</div>

        </div>

        <div className="page-item">	
          <div className="page-item-quick-actions"> 
            <h1> Quick Actions </h1>
            <hr/>
            <div className="quick-actions"> 
              {routesData.map( ({ routeName, ...other }) => 
                <ActionCard key={routeName} { ...other }/>
              )}
            </div>
          </div>
        </div>

			</div>
		);
	}

export default CompanyHomePage