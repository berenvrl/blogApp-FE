import { useDispatch } from 'react-redux'
import { showNotificationWithTime } from '../reducers/notificationReducer'
import { deletingBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Details from './Details'
import Button from './Button'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
    const dispatch=useDispatch()

    const handleDeleteBlog = async blog => {
      const loggedUserJSON = window.localStorage.getItem('loggedUserBlogsApp')

      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        blogService.setToken(loggedUser.token)

        const confirm = window.confirm(
          `Àre you sure want to delete ${blog.title}?`,
        )

        if (confirm) {
          try {
            dispatch(deletingBlog(blog.id))
            dispatch(showNotificationWithTime(`${blog.title} deleted!`, 'green', 10))
          } catch (err) {
            console.log(err)

            dispatch(
              showNotificationWithTime(
                `${blog.title} has already deleted from the server!`, 'red',
                10,
              ),
            )
          }
        }
      }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
      <li style={blogStyle} className="blog">
        {blog.title} {blog.author}
        <div className="buttons">
          <Togglable
            buttonLabel="View"
            buttonLabel2="Hide"
            className="view-button"
          >
            <Details blog={blog} />
          </Togglable>
          <Button className="remove" onClick={() => handleDeleteBlog(blog)}>
            Remove
          </Button>
        </div>
      </li>
    )
}

export default Blog
