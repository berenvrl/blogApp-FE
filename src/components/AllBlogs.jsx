import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/allusersReducer'
import { Link } from 'react-router-dom'

const AllBlogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const users = useSelector(state => state.allusers)
  console.log(users)

  const blogsArray = users.map(user => user.blogs)
  //console.log(blogsArray.flat())

  return (
    <div className="container row p-3">
      {blogsArray.flat().map(blog => (
        <Link
          key={blog.id}
          className="link text-decoration-none list-unstyled"
          to={`/blogs/${blog.id}`}
        >
          <li className="mb-0">{blog.title}</li>
        </Link>
      ))}
    </div>
  )
}

export default AllBlogs
