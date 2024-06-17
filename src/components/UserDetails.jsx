import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { BrowserRouter as Link } from "react-router-dom"
import { Table} from 'react-bootstrap'
import { getAllUsers } from "../reducers/allusersReducer"

const UserDetails=()=>{
  const dispatch=useDispatch()

  useEffect(()=>{
  dispatch(getAllUsers())
  },[])

  const users = useSelector(state => state.allusers)
  // console.log(users)

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="text-decoration-none">
                  {user.name}
                </Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserDetails