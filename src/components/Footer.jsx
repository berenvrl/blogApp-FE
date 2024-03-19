const Footer=() => {
    return <div className="footer">
        <ul className="navbar">
            <a>About Blog App</a>
            <a>Home</a>
            <a>Join us</a>
            <a>How to Use</a>
            <a>Contact</a>
        </ul>
        <ul className="social">
            <a href='#'>
                <i className="fab fa-instagram" style={{ color:'#fff' }}></i></a>
            <a href='#'>
                <i className="fab fa-facebook" style={{ color:'#fff' }}></i></a>
            <a href='#'>
                <i className="fab fa-youtube" style={{ color:'#fff' }}></i></a>
            <a href='#'>
                <i className="fab fa-twitter" style={{ color:'#fff' }}></i></a>
        </ul>
        <small className="website-rigths">Blog App © 2024</small>
    </div>
}

export default Footer