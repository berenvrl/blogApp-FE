import { createSlice } from "@reduxjs/toolkit";
import usersService from '../services/users'

const alluserSlice=createSlice({
  name:'allusers',
  initialState:[],
  reducers:{
    setUsers(state,action){
      return action.payload
    }
  }
})

export const getAllUsers=()=>{
  return async dispatch=>{

    const users=await usersService.getAllUsers()
    dispatch(setUsers(users))

  }
}

export const {setUsers}=alluserSlice.actions
export default alluserSlice.reducer