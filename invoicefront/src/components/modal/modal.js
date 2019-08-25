import { useEffect } from 'react'
import ReactDom from 'react-dom'
import './modal.scss'

const modalRoot = document.getElementById('modal-root')

const Modal = (props) => {
  const element  = document.createElement('div')

  useEffect(()=> {
    modalRoot.appendChild(element)
  })

  return(
    ReactDom.createPortal(props.children,  element)
  )
}


export default Modal 

