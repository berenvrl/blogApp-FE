import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const NotificationBar = () => {
  const notification = useSelector(state => state.notification)
  //console.log(notification)

  return (
    <div >
      <Alert variant={
        notification.color && (notification.color === 'red' ? 'danger':'success')}>{notification.message}</Alert>
    </div>
  )
}

export default NotificationBar
