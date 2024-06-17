import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const initialState=[]

const blogSlice= createSlice({
  name:'blogs',
  initialState:initialState,
  reducers:{
    createBlog(state,action){
      const {title, author, url, likes}= action.payload
      const newBlog={title, author,url,likes}

      return [...state, newBlog]
    },
    likeBlog(state, action){
      const {id}= action.payload
      
      console.log('id',id)

      // const votedBlog= state.find(n=>n.id===id)
      // const tobeVoted = {
      //   ...votedBlog,
      //   likes: votedBlog.likes + 1,
      // }
      // console.log('votedblog',votedBlog)

      // return state.map(blog=>blog.id !== id ? blog : tobeVoted)

      return state.map(blog=>{
        if(blog.id=== id){
          return {...blog, likes:blog.likes +1}
        }
      })
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    setBlogs(state, action){
      return action.payload
    },
    deleteBlog(state, action){
      const id= action.payload.id
      return state.filter(blog=>blog.id !== id)
    },
    resetBlogs(state,action){
      return initialState
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch, getState) => {

    const state=getState()

    if(state.user){

      //console.log(state.user.token)
      // const token=state.user.token
      // blogService.setToken(token)
      const blogs = await blogService.getAll()

      window.localStorage.setItem('loggedInitialBlogs', JSON.stringify(blogs))
      
      dispatch(setBlogs(blogs))

      console.log('user blogs', blogs)
    }else{
      console.log('eyvah bu blogu atlıyor')
    }
  }
}

export const openSelectedBlog=id=>{
  return async dispatch=>{
    const selected= await blogService.getSelectedBlog(id)

    console.log('selected blog', selected)

    dispatch(setBlogs(selected))
  }

}


export const createNewBlog = newObj => {
  return async dispatch => {
    const newBlog = await blogService.create(newObj)
    console.log('new blog', newBlog)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLike = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const tobeVoted = state.allblogs.find(n => n.id === id)

    console.log('toBeVoted', tobeVoted)

    if (tobeVoted) {
      const votedBlog = {
        ...tobeVoted,
        likes: tobeVoted.likes + 1,
      }
      const updatedBlog = await blogService.update(id, votedBlog)

      if(updatedBlog){

        dispatch(likeBlog({id}))
      }
    }
  }
}

export const deletingBlog = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const toBeDeleted = state.blogs.find(n => n.id === id)
    const url = `${blogService.baseUrl}/${toBeDeleted.id}`
    await blogService.deleteBlog(url)

    dispatch(deleteBlog({ id }))
  }
}


export const { createBlog, appendBlog, setBlogs, deleteBlog, likeBlog, resetBlogs } =
  blogSlice.actions

export default blogSlice.reducer