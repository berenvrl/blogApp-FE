import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {

  token = `Bearer ${newToken}` 
 
  //console.log('current token',token)
}

//getting all blogs data
const getAll = async () => {
  //console.log('suanki token=?', token)

  const config = {
    headers: { Authorization: token },
  }
  //console.log('config',config)

  const response = await axios.get(baseUrl, config)

  //console.log(response.data)
  return response.data
}

//getting the blog selected/clicked
const getSelectedBlog=async(id)=>{
  const config={
    headers: {Authorization: token},
  }
  const response= await axios.get(`${baseUrl}/${id}`,config)

  console.log('getting spesific blog',response.data)

  return response.data
}

//post with authorization
const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

//updating a blog
const update = async (id, newObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.put(`${baseUrl}/${id}`, newObj, config)

  return result.data
}

//deleting a blog from db
const deleteBlog = async url => {
  const config = {
    headers: { Authorization: token },
  }
  if (config.headers.Authorization) {
    const result = await axios.delete(url, config)
    return result.data
  }
}

export default {
  getAll,
  baseUrl,
  create,
  update,
  deleteBlog,
  setToken,
  getSelectedBlog,
}
