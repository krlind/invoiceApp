import React, { useState, useEffect } from 'react'
import comanyServices from '../../services/company.js'
import DisplayCompanies from './DisplayCompanies'



const Home = (props) => {
	const [ companies, setComapnies ] = useState([])

	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem('userDetails'))
		comanyServices
		.getAll(user)
		.then(company => setComapnies(company))
	}, [])

	const redirectToCompPage = (event) => {
	
		const path = event.target.value
		props.history.push(`/comphome/${path}`)	
		
	}
	
	return(
    <div className="container w-80">
			<h1 className="text-center h4 mb-4">Select the company</h1>

				{companies.map(company =>
					<DisplayCompanies
						key={company.id}
						companies={company}
						redirectToCompPage={redirectToCompPage}
					/>
				)}
    </div>
	)
}

export default Home


