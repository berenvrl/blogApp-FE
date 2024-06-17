import { createSlice } from "@reduxjs/toolkit";
import commentsService from '../services/comments'

const commentSlice=createSlice({
  name:'comments',
  initialState:[],
  reducers:{
    createComment(state,action){
      const {comment}= action.payload
      const newComment= {comment}

      //console.log('newComment', newComment)

      return [...state, newComment]
    },
    appendComment(state,action){
      state.push(action.payload)
    },
    setComments(state,action){
      return action.payload
    },
   
  }
})

export const initializeComments=(id)=>{
  return async (dispatch,getState)=>{

    const state= getState()

    if(state.user){

      commentsService.setToken(state.user.token)

      const comments = await commentsService.getAll(id)

      //console.log('comments',comments)
  
      window.localStorage.setItem('loggedInitialComments', JSON.stringify(comments))

      const selectedBlogUser = state.allusers.find(user => user.id === comments.user)

      window.localStorage.setItem(
        'selectedBlogUser',
        JSON.stringify(selectedBlogUser.name)
      )
     
      dispatch(setComments(comments))
  
      //console.log('tüm commnets',comments)
    }else{
      console.log('noouu! :(')
    }
  }
}

export const createNewComment=(id,comment)=>{

  return async(dispatch, getState)=>{
    const state= getState()

    if(state.user){
      
      commentsService.setToken(state.user.token)

      const newComment = await commentsService.create(id,comment)
  
      //console.log('newComment', newComment)
  
      dispatch(appendComment(newComment))
    }else{
      console.log('eyvaahlar olsun')
    }
  }
}


export const {createComment, appendComment, setComments}=commentSlice.actions
export default commentSlice.reducer