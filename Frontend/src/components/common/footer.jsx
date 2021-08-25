import React from 'react'

const Footer = (props) => {
  return (
    <footer className="s-footer">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mt-2">
            <div className="footer-col">
              <h5>About Us</h5>
              <p>This is just a test</p>
            </div>
          </div>
          <div className="col-md-push-2 col-md-3 mt-2">
            <div className="footer-col"></div>
          </div>
          <div className="col-md-push-3 col-md-3 col-sm-6 mt-2">
            <div className="footer-col"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
