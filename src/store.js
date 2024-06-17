import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './reducers/blogReducer'
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import allusersReducer from "./reducers/allusersReducer";
import commentsReducer from "./reducers/commentsReducer";
import selectedBlogReducer from "./reducers/selectedBlogReducer";


//to save all states in store
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    allusers: allusersReducer,
    comments: commentsReducer,
    selectedBlog: selectedBlogReducer,
  },
})

//console.log('store states',store.getState())

export default store
