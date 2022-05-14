import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/6660-removebg-preview.png'

const Home = () => {
  return (
    <section id="header" className="d-flex align-items-center">
    <div className="container-fluid ">
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="row">
            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center  flex-column">
              <h1>
                The Smile 🙂 Bright 🌞 Foundation
              </h1>
              <h2 className="my-3">
                -Bring The Smile
              </h2>
              <div className="mt-3">
                <Link to='/login' className="btn-get-started">
                 Get Started
                </Link>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 header-img">
              <img
                src={logo}
                className="img-fluid animated"
                alt="home img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Home