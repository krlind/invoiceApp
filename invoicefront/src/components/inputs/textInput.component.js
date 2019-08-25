import React from 'react'

import './textInput.component.style.scss'

import TextField from '@material-ui/core/TextField';

const TexinputComponent = (props) => {

	return(

    <TextField
      className="customer-text-item"
      label={props.text}
      value={props.value} 
      name={props.name}
      onChange={ props.onChange }
      margin="dense"
    />
 
   


	)
}

export default TexinputComponent
