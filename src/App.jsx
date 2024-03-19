import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import NotificationBar from './components/NotificationBar'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import ParticlesBg from 'particles-bg'

const App = () => {
    const [blogs, setBlogs] = useState([])

    //user authentication
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    //const [notification, setNotification] = useState("");

    const [errorMessage, setErrorMessage] = useState(false)
    const[errorsituation, setErrorSituation]=useState(false)
    const [loginVisible, setLoginVisible] = useState(false)
    const [sorted, setSorted] = useState([])
    const [clickedSort, setClickSprt] = useState(false)

    //clear inputs after events
    const clearInputField = () => {
        setUsername('')
        setPassword('')
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            //save user to local storage
            window.localStorage.setItem('loggedUserBlogsApp', JSON.stringify(user))

            //update token
            blogService.setToken(user.token)

            //update user
            setUser(user)
            clearInputField()

            const initialBlogs = await blogService.getAll()

            window.localStorage.setItem(
                'loggedInitialBlogs',
                JSON.stringify(initialBlogs)
            )
            setBlogs(initialBlogs)
        } catch (err) {
            setErrorSituation(true)
            shownotification('Wrong Credentials', errorsituation)

            // setErrorMessage('Wrong Credentials')
            // dontShowNotification()
            console.log(err)
        }
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUserBlogsApp')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
            getBlogs()
        }
    }, [])

    //getting all data from db
    const getBlogs = async () => {
        try {
            const initialBlogs = await blogService.getAll()
            window.localStorage.setItem(
                'loggedInitialBlogs',
                JSON.stringify(initialBlogs)
            )
            setBlogs(initialBlogs)
        } catch (err) {
            setErrorSituation(true)
            shownotification('Fail getting blogs', errorsituation)
            // setErrorMessage('Fail getting blogs')
            console.error(err)
        }
    }

    const handleLogout = async () => {
        setUser(null)
        clearInputField()
        window.localStorage.removeItem('loggedUserBlogsApp')

    }

    const shownotification = (text, errorsituation) => {
    // setNotification(text);
        setErrorMessage(text)
        dontShowNotification()
    }

    const dontShowNotification = () => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const blogFormRef = useRef()

    const addBlog = (blogObj) => {

        if(blogObj.title && blogObj.author && blogObj.url && blogObj.likes){
            try{
                blogFormRef.current.toggleVisibility()

                const returnedBlog = blogService.create(blogObj).then((returned) => {
                    setBlogs([...blogs, returned])
                })

                setErrorSituation(false)
                shownotification(`${blogObj.title} added!`, errorsituation)

            }catch{
                setErrorSituation(true)
                shownotification('Error adding blog!', errorsituation)

            }

        }else{
            setErrorSituation(true)
            shownotification('Fill all blanks!', errorsituation)

        }
    }

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button className='loginbtn' onClick={() => setLoginVisible(true)}>Log In</button>
                </div>
                <div style={showWhenVisible} className='login'>
                    <LoginForm
                        handleLogin={handleLogin}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                    <button className='cancel' onClick={() => setLoginVisible(false)}>X</button>
                </div>
            </div>
        )
    }

    const handleLikes = async (id) => {
        const updatedBlogs = blogs.map((blog) => {
            if (blog.id === id) {
                const updatedLikes = blog.likes + 1
                return { ...blog, likes: updatedLikes }
            }
            return blog
        })

        setBlogs(updatedBlogs)

        const objtobechanged = updatedBlogs.find((blog) => blog.id === id)

        await blogService.update(id, objtobechanged)
    }

    const handleSort = () => {
        setClickSprt((clickedSort) => !clickedSort)
        //descending order
        const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
        setSorted(sortedBlogs)
    }

    const handleDeleteBlog = async (blog) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUserBlogsApp')

        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            blogService.setToken(loggedUser.token)

            const confirm = window.confirm(
                `Àre you sure want to delete ${blog.title}?`
            )

            if (confirm) {
                const url = `${blogService.baseUrl}/${blog.id}`

                try {
                    await blogService.deleteBlog(url)

                    setBlogs(
                        blogs.filter((item) => {
                            return item.id !== blog.id
                        })
                    )

                    //setErrorMessage(`${blog.title} deleted!`)
                    setErrorSituation(false)
                    shownotification(`${blog.title} deleted!`,errorsituation)
                } catch (err) {
                    console.log(err)
                    setErrorSituation(true)
                    shownotification(`${blog.title} has already deleted from the server!`,errorsituation)
                }
            }
        }
    }

    return (
        <div className='app'>
            <div className='container'>
                <ParticlesBg type='circle' bg={true}/>
                <h1>Blogs</h1>
                {errorMessage && <NotificationBar message={errorMessage} errorsituation={errorsituation} />}
                {!user && loginForm()}
                {user && (
                    <MainPage user={user} handleLogout={handleLogout} handleSort={handleSort} clickedSort={clickedSort} addBlog={addBlog} blogs={blogs} sorted={sorted} handleLikes={handleLikes} handleDeleteBlog={handleDeleteBlog} blogFormRef={blogFormRef} />
                )}
            </div>
            <Footer/>
        </div>
    )
}

const MainPage=({ user, handleLogout, handleSort,clickedSort, addBlog, blogs, sorted,handleLikes, handleDeleteBlog, blogFormRef }) => {
    return(
        <div className='mainpage'>
            <p>{user.name} logged in</p>
            <button className='logout' onClick={handleLogout}>Log Out</button>
            <button className='sortbtn' onClick={handleSort}>{`${
                !clickedSort ? 'Sort By Likes' : 'See normal order'
            }`}</button>
            <Togglable
                buttonLabel="New Blog"
                buttonLabel2="Cancel"
                ref={blogFormRef}
            >
                <NewBlog createBlog={addBlog} />
            </Togglable>
            <ul>
                {(!clickedSort ? blogs : sorted).map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikes={handleLikes}
                        handleDeleteBlog={handleDeleteBlog}
                    />
                ))}
            </ul>
        </div>
    )
}

export default App
