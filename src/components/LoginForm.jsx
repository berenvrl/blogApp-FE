import InputField from './InputField'

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
}) => {
    return (
        <div className='loginForm'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <InputField
                    name="Username"
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    id='username'
                />
                <InputField
                    name="Password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                />
                <button onClick={handleLogin} id='login-button'>Log In</button>
            </form>
        </div>
    )
}

export default LoginForm
