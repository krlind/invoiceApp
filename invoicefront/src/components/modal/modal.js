import React, {useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import './modal.scss'

const modalRoot = document.getElementById('modal-root')

const Modal = (props) => {
  const [ element, setElement ] = useState(document.createElement('div'))

  useEffect(()=> {
    modalRoot.appendChild(element)
  })

  // modalRoot.removeChild(element)


  // useEffect(() => {
	// 	const user = JSON.parse(window.localStorage.getItem('userDetails'))
	// 	comanyServices
	// 	.getAll(user)
	// 	.then(company => setComapnies(company))
	// }, [])

  return(
    ReactDom.createPortal(props.children,  element)
  )
}


export default Modal 

