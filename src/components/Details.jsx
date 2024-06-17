import { useDispatch } from 'react-redux'
import { updateLike } from '../reducers/blogReducer'
import Button from './Button'
import PropTypes from 'prop-types'

const Details = ({ blog }) => {
    const dispatch=useDispatch()

    const handleLikes = async id => {
        dispatch(updateLike(id))
    }

    return (
      <div className="details">
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p className="likes">
          {blog.likes}
          <Button onClick={() => handleLikes(blog.id)}>+ Likes</Button>
        </p>
      </div>
    )
}

Details.propTypes = {
    blog: PropTypes.object.isRequired,
}
export default Details
