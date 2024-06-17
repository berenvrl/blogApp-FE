import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CommentSection from './CommentSection'
import { getSelect, updateLike } from '../reducers/selectedBlogReducer'

const BlogDetails = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  const clicked = useSelector(state => state.selectedBlog)

   useEffect(() => {
     dispatch(getSelect(id))
   }, [id])

  // const clicked = useSelector(state =>
  //   state.allblogs.find(blog => blog.id === id),
  // )


  console.log('clicked', clicked)

  const clickedBlog = JSON.parse(localStorage.getItem('loggedInitialComments'))

  // const selectedBlog= allblogs.find(blog=>blog.id === clickedBlog.id)

  // console.log('clickedBlog',clickedBlog)

  const userInfo = JSON.parse(localStorage.getItem('selectedBlogUser'))
  console.log(userInfo)

 


  const handleLikes = async id => {
    //dispatch(openSelectedBlog(id))

    dispatch(updateLike(id))
  }

  return (
    <div className="blogdetails">
      {clickedBlog && (
        <>
          <h2>
            {clicked.title} {clicked.author}
          </h2>
          <div>
            <p>{clicked.url}</p>
            <span>{clicked.likes}likes</span>
            <button className="likebtn" onClick={() => handleLikes(id)}>
              Like
            </button>
            <p>Added by {userInfo} </p>
          </div>
        </>
      )}
      <h2>Comments</h2>
      <CommentSection />
    </div>
  )
}

export default BlogDetails
