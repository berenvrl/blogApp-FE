import { useSelector } from 'react-redux'
import ParticlesBg from 'particles-bg'
import NotificationBar from './NotificationBar'
import LoginPart from './LoginPart'
import MainPage from './MainPage'


const Container = () => {

  const curnotification=useSelector(state=>state.notification)
  const user=useSelector(state=>state.user)

  return (
    <div className="containerdiv">
      <ParticlesBg type="circle" bg={true} />
      <h1>Blogs</h1>
      {curnotification && <NotificationBar />}
      {!user ? <LoginPart/> : <MainPage/>}
    </div>
  )
}

export default Container
