import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message:'',
    color:''
  },
  reducers: {
    showNotification(state, action) {
      const {message, color}=action.payload
      state.message=message,
      state.color=color
    },
    clearNotification(state) {
      return {
        message:'',
        color:''
      }
    }
  },
})

export const showNotificationWithTime = (message, color,duration) => dispatch => {
  dispatch(showNotification({message,color}))

  setTimeout(() => {
    dispatch(clearNotification())
  }, duration*1000)
  
  console.log(message)
}


export const { showNotification, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
