import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const UserInfo=()=>{
  const id= useParams().id
  const users= useSelector(state=>state.allusers)
  const clickedUser = users.find(user => user.id === id)
  const blogList= clickedUser.blogs;
  // console.log(clickedUser)

  return (
    <div className="userInfo">
      <h2>{clickedUser.name}</h2>
      {blogList.length === 0 ? (
        <p>{`No any blogs added by ${clickedUser.name}`}</p>
      ) : (
        <>
          <p>Added Blogs</p>
          <ul>
            {blogList.map(blog => (
              <li>{blog.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default UserInfo