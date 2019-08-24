import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { withRouter } from 'react-router-dom'


import './NavBar.css'




const NavBar = (props) =>  {
	console.log(props)
	return (
		<div className="main-navigation">	
			<Navbar bg="light" expand="lg">
				<Navbar.Brand> 
					<Link to="/home">Invoice App</Link>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto navbar sticky-top">
						<NavItem>
							<NavLink to="/createCustomer" >Create Customer</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/createSalesInvoice'>Create Sales Invoice</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to='/createPurchaseInvoice'>Create Purchase Invoice</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="#link">Reporting</NavLink>
						</NavItem>
						<NavItem>
							<NavLink to="#link">Logout</NavLink>
						</NavItem>
					</Nav>
				</Navbar.Collapse>

			</Navbar>
		</div>
	)

}

export default withRouter(NavBar)


