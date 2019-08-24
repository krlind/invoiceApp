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

// import React from 'react';
// import ReactDOM from 'react-dom';

// import './modal.scss'

// console.log('hello from modal')

// const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
//   <React.Fragment>
//     <div className="modal-overlay"/>
//     <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
//       <div className="modal">
//         <div className="modal-header">
//           <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <p>
//           Hello, I'm a modal.
//         </p>
//       </div>
//     </div>
//   </React.Fragment>, document.body
// ) : null;

// export default Modal;