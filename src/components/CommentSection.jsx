import { useEffect} from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import InputField from "./InputField"
import Button from "./Button"
import { createNewComment } from "../reducers/commentsReducer"
import { showNotificationWithTime } from "../reducers/notificationReducer"
import { initializeComments } from "../reducers/commentsReducer"

const CommentSection = () => {

  const dispatch=useDispatch()
  const id= useParams().id

  const commentsFromLS = JSON.parse(
    localStorage.getItem('loggedInitialComments')
  )

  // console.log(commentsFromLS.comments)

  useEffect(()=>{

    if(commentsFromLS.comments){
      dispatch(initializeComments(id))
    }else{
      console.log('no comments to be shown')
    }
  },[]) 


  const addComment=async(event)=>{
    event.preventDefault()

    const comment=event.target.Comment.value

    if(comment){
      try{
        const newComment={
          comment:comment,
        }
        
        event.target.Comment.value=''

        // console.log('print comment',newComment)

        dispatch(createNewComment(id,newComment))
        showNotificationWithTime('Your comment added!','green',3)
      }catch{
        dispatch(showNotificationWithTime('Error','red',3))
      }
    }else{
      dispatch(showNotificationWithTime('Fill comment area!', 'red', 3))
    }
  }

  return (
    <div className="commentcontainer">
      <form onSubmit={addComment}>
        <InputField name="Comment" placeholder="Make a comment..." id="comment" className='commentInput'/>
        <Button type="submit" className='addComment'>Add Comment</Button>
      </form>
      {commentsFromLS.comments && (
        <ul style={{'padding':'0'}}>
          {commentsFromLS.comments.map(comment => (
            <li style={{'listStyle':'none'}}>{comment.comment}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default CommentSection