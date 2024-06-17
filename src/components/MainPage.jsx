import { useDispatch, useSelector } from "react-redux"
import { useState, useRef } from "react"
import store from '../store'
import NewBlog from "./NewBlog"
import Togglable from "./Togglable"
import Button from "./Button"
import BlogsAll from "./BlogsAll"


const MainPage = () => {

  const [sorted, setSorted] = useState([])
  const [clickedSort, setClickSprt] = useState(false)
  const [showForm, setShowForm] = useState(true)

  // const dispatch=useDispatch()
  const user=useSelector(state=>state.user)
  const totalblogs = useSelector(state => state.blogs)
  // console.log(totalblogs)

  // console.log('store.getState()',store.getState())

  if(!user){
    return null
  }

  const handleSort = () => {
    setClickSprt(clickedSort => !clickedSort)
    //descending order
    const sortedBlogs = [...totalblogs].sort((a, b) => b.likes - a.likes)
    setSorted(sortedBlogs)
  }

   const blogFormRef = useRef()

  return (
    <div className="mainpage">
      <Button className="sortbtn" onClick={handleSort}>
        {`${!clickedSort ? 'Sort By Likes' : 'See normal order'}`}
      </Button>
      {showForm &&(
        <Togglable buttonLabel="New Blog" buttonLabel2="Cancel" ref={blogFormRef}>
          <NewBlog  setShowForm={setShowForm}/>
        </Togglable>
      )}
      <h2>Blogs Added</h2>
      <BlogsAll clickedSort={clickedSort} sorted={sorted}/>
    </div>
  )
}

export default MainPage