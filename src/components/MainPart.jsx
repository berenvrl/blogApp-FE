import { useDispatch, useSelector } from "react-redux"
// import store from "../store"
import Button from "./Button"
import { logOutSuccess } from "../reducers/userReducer"
import { resetBlogs } from "../reducers/blogReducer"
import blogService from '../services/blogs'


const MainPart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs=useSelector(state=>state.blogs)
  // console.log('blogs in mainpart',blogs)

  if(!user){
    return null
  }

  const handleLogout = async () => {
    dispatch(logOutSuccess())
    dispatch(resetBlogs())
    
    
    window.localStorage.removeItem('loggedUserBlogsApp')
    window.localStorage.removeItem('loggedInitialBlogs')

    // console.log('store',store.getState())
    blogService.setToken(null)
  
  }

  return (
    <div className="loggedin-part">
      <div>{user.name} logged in</div>
      <Button className="logout" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  )
}
export default MainPart