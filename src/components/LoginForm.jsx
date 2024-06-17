import { useDispatch, useSelector } from 'react-redux'
import InputField from './InputField'
import Button from './Button'
import { updateUser } from '../reducers/userReducer'
import { showNotificationWithTime } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'


const LoginForm = () => {
  
  const dispatch=useDispatch()

  // const initialBlogs= useSelector(state=>state.blogs)
  // console.log('initialBlogs after login',initialBlogs)
  // const initialUser= useSelector(state=>state.user)
  // console.log('initialUser after login',initialUser)

  const handleLogin =  async event => {
    event.preventDefault()
    
    const username = event.target.Username.value;
    const password=event.target.Password.value;

      if(username && password){
          dispatch(updateUser(username,password)).then(()=>{
            dispatch(initializeBlogs())
          })

          // showNotificationWithTime('Wrong Credentials', 'red', 5)
        }else{
          dispatch(showNotificationWithTime('Fill all areas!', 'red', 5))
        } 
    }
    return (
      <div className="loginForm">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <InputField
            name="Username"
            type="text"
            placeholder="Username"
            id="username"
          />
          <InputField
            name="Password"
            type="password"
            placeholder="Password"
            id="password"
          />
          <Button type="submit" id="login-button">
            LogIn
          </Button>
        </form>
      </div>
    )
}

export default LoginForm
