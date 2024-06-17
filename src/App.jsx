import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'
import blogService from './services/blogs'
import Container from './components/Container'
import Footer from './components/Footer'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import MainPart from './components/MainPart'
import AllBlogs from './components/AllBlogs'
import UserInfo from './components/UserInfo'
import { initializeBlogs} from './reducers/blogReducer'
import { loginSuccess } from './reducers/userReducer'
import { showNotificationWithTime } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  // const totalblogs = useSelector(state => state.blogs)
  // console.log('totalBlogs', totalblogs)
  const user = useSelector(state => state.user)
  // console.log('userInfo', user)

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserBlogsApp')

    dispatch(initializeBlogs())

    //console.log('loggedUserBlogsApp', loggedUserJSON)

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('user', user)
      dispatch(loginSuccess(user))
      //updating token
      blogService.setToken(user.token)

      // console.log('app.jsx user.token', user.token)

      dispatch(initializeBlogs())
    }
  }, [])


  return (
    <div className="app">
      <Router>
        {user &&
        <div className="container-fluid">
          <Navbar
            collapseOnSelect
            expand="lg"
            className="d-flex justify-content-center barnav"
          >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link className="link text-decoration-none text-white" to="/">
                    Home Page
                  </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link
                    className="link text-decoration-none text-white"
                    to="/blogs"
                  >
                    Blogs
                  </Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link
                    className="link text-decoration-none text-white"
                    to="/users"
                  >
                    Users
                  </Link>
                </Nav.Link>
                <MainPart />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        }
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/users" element={<UserDetails />} />
          <Route path='/users/:id' element={<UserInfo/>}/>
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}


export default App
