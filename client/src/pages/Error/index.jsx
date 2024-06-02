import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
import image from "../../../img/error.jpg"
import { Helmet } from 'react-helmet-async'

const Error = () => {
  return (
    <>
      <Helmet>
        <title>
          Error
        </title>
      </Helmet>
      <section>
        <div className="error-container">
          <div className="error-text">
            <h1>Oops</h1>
            <h2>404 Page Not Found</h2>
            <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
            <ul className="error-menu">
              <li><Link to={"/"}>Go to Home</Link></li>
            </ul>
          </div>
          <div>
            <img className="error-image" src={image} alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Error