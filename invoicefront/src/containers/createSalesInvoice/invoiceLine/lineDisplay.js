import React from 'react'

const LineDisplay = (props) => {

  return(
    <tr key={props.i}>
      <td>{ props.i + 1 }</td>
      <td>
        <input 
          type="text"
          name="lineDescription"
          value={props.data.lineDescription}
          onChange={props.onChange(props.i)}
        />
      </td>
      <td>
        <input
          type="number"
          name="priceWithoutVat"
          value={props.data.priceWithoutVat}
          onChange={props.onChange(props.i)}
        />
      </td>
      <td>
        <input
            type="number"
            name="quantity"
            value={props.data.quantity}
            onChange={props.onChange(props.i)}
          />
      </td>
      <td>
      <input
          type="number"
          name="vatPct"
          value={props.data.vatPct}
          onChange={props.onChange(props.i)}
 
        />
      <button>...</button>
      </td>
      <td>
        <div> 
          {props.data.priceWithVat}
        </div>
      </td>
      <td>
      <div>
        {props.data.vatAmount}
      </div>
      </td>
    </tr>
  )
}


export default LineDisplay