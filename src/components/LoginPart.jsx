import { useState } from "react"
import LoginForm from "./LoginForm"
import Button from "./Button"

const LoginPart = () => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          className="loginbtn"
          onClick={() => setLoginVisible(true)}
          type="button"
        >
          LogIn
        </Button>
      </div>
      <div style={showWhenVisible} className="login">
        <LoginForm />
        <Button
          className="cancel"
          onClick={() => setLoginVisible(false)}
          type="button"
        >
          X
        </Button>
      </div>
    </div>
  )
}
export default LoginPart