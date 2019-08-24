import { useState } from 'react'

// export const useForm = (callback, initialStae = {}, validate) => {
//     const [ values, setValues ] = useState(initialStae)
//     const [ errors, setErrors ] = useState({})

//     const onChange = (e) => {
//       setValues({...values, [e.target.name]: e.target.value})
// 		}
		
// 		const onSubmit = (e) => {
// 			e.preventDefault()

// 			if(Object.keys(validate(values)).length === 0){
// 				callback()
// 				setValues(initialStae)
// 			} else {
// 				setErrors(validate(values))
// 			}
// 		}
// 	return{
// 		onChange,
// 		onSubmit,
// 		errors,
// 		values
// 	}
// }


const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

	// console.log('hello from useModal Customhook')

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;