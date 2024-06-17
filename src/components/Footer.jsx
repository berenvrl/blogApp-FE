const Footer = () => {
  return (
    <footer className="footer text-white container-fluid p-4 pb-0">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-lg-4">
            <ul className="list-unstyled d-flex justify-content-between">
              <li>
                <a className="text-white text-decoration-none" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="text-white text-decoration-none" href="#">
                  Join us
                </a>
              </li>
              <li>
                <a className="text-white text-decoration-none" href="#">
                  How to Use
                </a>
              </li>
              <li>
                <a className="text-white text-decoration-none" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-6 col-md-3 col-lg-2">
            <ul className="list-unstyled d-flex justify-content-between">
              <li>
                <a href="#">
                  <i className="fab text-white fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab text-white fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab text-white fa-youtube"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab text-white fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center">
        <small className="text-muted">Blog App © 2024</small>
      </div>
    </footer>
  )
}

export default Footer;
