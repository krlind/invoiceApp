import React, { useState } from 'react'


import CreateNewCustomer from './CreateCustomer'

import CenteredTabs from '../../components/tab/tab.component'

import './customerMasterData.style.scss'

// import { useForm } from '.../hooks/hooks.js'


const CreateCustomer = (props) => {
	const [ tabSelected, setTabSelected ] = useState('Create a New Customer')


	return(
    <div className="page-container">
			<div className="page-item">	
				<h1>{tabSelected}</h1>
				<hr/>
				<div className="page-item-customer-master-data">
					<CenteredTabs setTabSelected={setTabSelected} /> 
					{
						tabSelected === 'Create a New Customer' ? <CreateNewCustomer />  : null
					}
					{
						tabSelected === 'Display Customers' ? <CreateNewCustomer />  : null
					}
				</div>
		</div>
	</div>
	)
}

export default CreateCustomer