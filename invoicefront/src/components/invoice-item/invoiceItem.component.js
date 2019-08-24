import React from 'react'


import './invoiceItem.styles.scss'

import TextField from '@material-ui/core/TextField';

const InvoiceItem = (props) => {

 
	return(
    <div className="invoice-item">
    <TextField
      id="standard-name"
      className="invoice-item"
      label={props.text}
      value={props.value} 
      margin="dense"
    />
    </div>
   


	)
}

export default InvoiceItem
