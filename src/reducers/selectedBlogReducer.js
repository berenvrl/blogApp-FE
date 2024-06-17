import { createSlice } from "@reduxjs/toolkit";
// import usersService from '../services/users'
import blogService from '../services/blogs'


const selectedBlog=createSlice({
  name:'selectedBlog',
  initialState:[],
  reducers:{
    setBlog(state, action){
      return action.payload
    },
    // likeBlog(state, action){
    //   const {id}= action.payload

    //   return state.map(blog=>{
    //     if(blog.id===id){
    //       return {...blog, likes:blog.likes+1}
    //     }
    //   })
    // }
  }
})


export const getSelect=(id)=>{
  return async dispatch=>{

    const selected= await blogService.getSelectedBlog(id)

    console.log('selected', selected)

    dispatch(setBlog(selected))
    
  }
}

export const updateLike=(id)=>{
  return async (dispatch, getState)=>{
    const state= getState()
    const selectedBlog= state.selectedBlog
    
    const votedBlog = {
      ...selectedBlog,
      likes: selectedBlog.likes + 1,
    }

    const updatedBlog = await blogService.update(id, votedBlog)

    if (updatedBlog) {
      dispatch(setBlog(updatedBlog))
    }
  } 
}

export const {setBlog}= selectedBlog.actions
export default selectedBlog.reducer
