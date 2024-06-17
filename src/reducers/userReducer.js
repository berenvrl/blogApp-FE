import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loginSuccess(state, action) {
      //update the user state with logged-in user
      return action.payload
    },
    logOutSuccess(state,action){
      return null
    },
  },
})


//update user in state
export const updateUser=(username, password)=>{
  return async (dispatch,getState)=>{
  
    const user = await loginService.login({ username, password })
    if(user){
      //save user to local storage
      window.localStorage.setItem('loggedUserBlogsApp', JSON.stringify(user))

      blogService.setToken(user.token)

      //update user
      dispatch(loginSuccess(user))
    }
    
    //console.log('token during update user', user.token)
    
    //console.log('user with setUser', user)
   
  }
}

// export const logOut=()=>{
  
//   return async (dispatch,getState)=>{
    
//     const state=getState()
    
//     dispatch(logOutSuccess())
   
//     //window.localStorage.removeItem('loggedUserBlogsApp')
//     console.log('state',state)
//     console.log('token after logout',state.user.token)
//   }
// } 


export const { loginSuccess, logOutSuccess, setToken } = userSlice.actions
export default userSlice.reducer
