import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { showNotificationWithTime } from '../reducers/notificationReducer'
import InputField from './InputField'
import Button from './Button'
// import store from '../store'


const NewBlog = ({setShowForm}) => {
  
  const dispatch=useDispatch()
  
    const addBlog=async(event)=>{
        event.preventDefault()
        
        const author= event.target.Author.value;
        const url= event.target.Url.value;
        const title= event.target.Title.value;
        const likes= event.target.Likes.value;
        
        if(author && url && title && likes){
          try{
              const newOne={
                title:title,
                author:author,
                url:url,
                likes:likes
              }
              event.target.Title.value=''
              event.target.Author.value = ''
              event.target.Url.value = ''
              event.target.Likes.value = ''
              
              
              dispatch(createNewBlog(newOne))
              
              dispatch(
                showNotificationWithTime(`${newOne.title} added!`,'green', 10),
              )
              setShowForm(false)
              // console.log(store.getState())
            }catch{
              dispatch(showNotificationWithTime('Error adding blog!','red',10))
            }
        }else{
            dispatch(showNotificationWithTime('Fill all areas!','red',5))
        }
    }

    return (
        <div className="loginForm">
          <h3>Create a New Blog</h3>
          <form onSubmit={addBlog}>
            <InputField
              name="Title"
              placeholder="Title"
              id="title"
            />
            <InputField
              name="Author"
              placeholder="Author"
              id="author"
            />
            <InputField
              name="Url"
              placeholder="Url"
              id="url"
            />
            <InputField
              name="Likes"
              placeholder="Likes"
              id="likes"
            />
            <Button type="submit">Save</Button>
          </form>
        </div>
      
    )
}

export default NewBlog

