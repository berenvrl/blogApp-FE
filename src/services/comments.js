import axios from "axios";

const baseUrl = '/api/blogs'

let token= null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  
  //console.log('current token comments', token)
}

//getting all comments data
const getAll = async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  //console.log('config',config)

  const response = await axios.get(`${baseUrl}/${id}/comments`, config)

  //console.log('getAll request of comments',response.data)
  
  return response.data
}

//post with authorization
//newObj comment icermektedir
const create = async (id,newObj) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log('config',config)
 
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObj, config)

  //console.log('post req sonucu',response.data)
  
  return response.data 
}

//updating a likes and coments(?)
// const update = async (id, newObj) => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const result = await axios.put(`${baseUrl}/${id}`, newObj, config)

//   return result.data
// }

//belki duruma göre yorumu sil butonu koyup delete request de koyarım

export default{
  getAll,
  setToken,
  create
}

