import React from 'react';


import './tab.component.style.scss'


const CenteredTabs= (props) =>  {


  return (
    <div className="tab-container">
      <div className="tab-items">
        <div 
          className="tab-item"
          onClick={()=> props.setTabSelected("Create a New Customer")}  
        >
          Create a new Customer
        </div>
        <div 
          className="tab-item"
          onClick={()=> props.setTabSelected("Display Customers")}  
        >
          Display Existing Customers
        </div>
        <div 
          className="tab-item"
          onClick={()=> props.setTabSelected("Update Existing Customer")}  
        >
          Update existing Customer
        </div>
      </div>
    </div>
  )
}

export default CenteredTabs