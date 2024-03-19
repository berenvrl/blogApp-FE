import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
    console.log(token)
}

//getting all blogs data
const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(baseUrl, config)
    return response.data
}

//post with authorization
const create = async (newObj) => {
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
const deleteBlog = async (url) => {
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
    setToken,
    baseUrl,
    create,
    update,
    deleteBlog,
}
