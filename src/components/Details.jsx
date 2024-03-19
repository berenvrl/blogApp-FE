import PropTypes from 'prop-types'

const Details = ({ blog, handleLikes }) => {
    return (
        <div className='details'>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p className='likes'>
                {blog.likes}
                <button onClick={() => handleLikes(blog.id)}>+ Likes</button>
            </p>
        </div>
    )
}
Details.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLikes: PropTypes.func.isRequired,
}
export default Details
