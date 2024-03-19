import Togglable from './Togglable'
import Details from './Details'

const Blog = ({ blog, handleLikes, handleDeleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <li style={blogStyle} className='blog'>
            {blog.title} {blog.author}
            <div className='buttons'>
                <Togglable buttonLabel='View' buttonLabel2='Hide' className='view-button'>
                    <Details blog={blog} handleLikes={handleLikes} />
                </Togglable>
                <button className='remove' onClick={() => handleDeleteBlog(blog)}>Remove</button>
            </div>
        </li>
    )
}

export default Blog
