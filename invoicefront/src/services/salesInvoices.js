import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/salesInvoice'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newSalesInvoice) => {
	// const config = {
	// 	headers: { Authorization: token }
  // }
  
  const response = await axios.post(baseUrl, newSalesInvoice) 
  return response.data
}

// const update = async (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   const response = await request;
//   return response.data
// }

// const remove = async ( id ) => {
//   const config = {
// 		headers: { Authorization: token}
//   }

//   const request = axios.delete(`${baseUrl}/${id}`,  config)
//   const response = await request
//   return response.data
// }

export default { getAll, create }