const LoginInfo = ({ user, handleLogout }) => {
    return (
        <div className="loggedin">
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LoginInfo
