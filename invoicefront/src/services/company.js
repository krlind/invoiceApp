import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/company'

// const setToken = (newToken) => { headers: { Authorization: `bearer ${newToken}` } }

const getAll = async (user) => {
  const config = { headers: { Authorization: `bearer ${user.token}` } }
  console.log(config)
  const request = axios.get(baseUrl, config)
  const response = await request
  return response.data
}

// const create = async (newBlog) => {
// 	const config = {
// 		headers: { Authorization: token }
//   }
  
//   const response = await axios.post(baseUrl, newBlog, config)
//   return response.data
// }

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

export default { getAll }