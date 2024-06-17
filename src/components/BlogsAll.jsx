import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogsAll = ({ clickedSort, sorted }) => {

  const totalblogs= useSelector(state=>state.blogs)

  return (
    <ul>
      {(!clickedSort ? totalblogs : sorted).map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  )
}

export default BlogsAll