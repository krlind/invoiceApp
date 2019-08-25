import React, { useState, useEffect } from 'react'
import comanyServices from '../../services/company.js'
import DisplayCompanies from './DisplayCompanies'

import Modal from '../../components/modal/modal';
import useModal from '../../hooks/hooks';


import './Home.style.scss'


import Profile from '../../components/modal/profile'

const Home = (props) => {
	const [ companies, setComapnies ] = useState([])

	const {isShowing, toggle} = useModal();

	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem('userDetails'))
		comanyServices
		.getAll(user)
		.then(company => setComapnies(company))
	}, [])

	const redirectToCompPage = (event) => {
		const path = event.target.value
		props.history.push(`/comphome/${path}`)	
		window.localStorage.setItem('companyId', path)
		
	}

	
	return(
    <div className="page-container">

			<div className="page-item">	
				<div className="page-item-company-card">
					<h1>Select a company</h1>
					<hr/>
					<div className="display-card">
						{companies.map(company =>
							<DisplayCompanies
								key={company.id}
								companies={company}
								redirectToCompPage={redirectToCompPage}
							/>
						)}
					</div>
				</div>
			</div>

			<div className="page-item">	
				<div className="page-item-latest-features">	
					<h1>Latest Features and How to guides</h1>
					<hr/>
				</div>
			</div>

 
 			{ isShowing &&
 				<Modal>
 					<Profile isShowing={isShowing} toggle={toggle}/> 
 				</Modal>
		
 			}	
 			<button onClick={toggle}>Show modal</button>


    </div>
	)
}

export default Home


