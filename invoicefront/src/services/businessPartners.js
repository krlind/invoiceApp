import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/businessPartner'





const getAll = async () => {
  const companyId = window.localStorage.getItem('companyId')
  const user = await JSON.parse(window.localStorage.getItem('userDetails'))


  const config = { headers: { Authorization: `bearer ${user.token}`, companyId: companyId } }
  const request = axios.get(baseUrl, config)
  const response = await request
  return response.data
}

const create = async (newBusinessPartner) => {
  const user = await JSON.parse(window.localStorage.getItem('userDetails'))
  const config = { headers: { Authorization: `bearer ${user.token}` } }

  
  const response = await axios.post(baseUrl, newBusinessPartner, config ) 

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