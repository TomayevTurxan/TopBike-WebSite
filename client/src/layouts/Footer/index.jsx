import React, { useContext } from 'react'
import "./index.scss"
import { Link, useNavigate } from 'react-router-dom'
import { CategoryContext } from '../../context/categoryContext'

function Footer() {
  const { setColorCategory, setCategory, setSizeCategory } = useContext(CategoryContext)
  const handleInstagramClick = () => {
    window.location.href = 'https://www.instagram.com/ilkin_akhmed/';
  };


  return (
    <footer>
      <div className="footerLeftBox">
        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/LOGO.png?v=1613575279" alt="" />
        <p>The simple, delicate and light design
          makes it comfortable for everyone.</p>
        <div className="socialMediaBox">
          <i className=' icon fa-brands fa-twitter'></i>
          <i className=' icon fa-solid fa-basketball'></i>
          <i className=" icon fa-brands fa-behance"></i>
          <i onClick={handleInstagramClick} className=' icon fa-brands fa-instagram'></i>
        </div>
      </div>
      <div className="footerRightBox">
        <div className="footerBox">
          <h2>Shop</h2>
          <div className="footerLine"></div>
          <Link className="footer-link" to={'/shop'}>Shopping</Link>
          <Link className="footer-link" onClick={() => setCategory('bike')} to={'/shop'}>Bicycle</Link>
          <Link className="footer-link" onClick={() => setCategory('accessory')} to={'/shop'}>Bicycle Accessories</Link>
          <Link className="footer-link" onClick={() => setCategory('helmet')} to={'/shop'}>Helmets</Link>
        </div>
        <div className="footerBox">
          <h2>Aboout Us</h2>
          <div className="footerLine"></div>
          <Link className="footer-link" to={'/about'}>About Us</Link>
          <Link className="footer-link" to={'/'}>Pagination</Link>
          <Link className="footer-link" to={'/'}>Terms & Conditions</Link>
          <Link className="footer-link" to={'/contact'}>Contact</Link>
          <Link className="footer-link" to={'/shop'}>Accessories</Link>
          <Link className="footer-link" to={'/'}>Term of use</Link>
        </div>
        <div className="footerBox">
          <h2>Information</h2>
          <div className="footerLine"></div>
          <Link className="footer-link" to={'/'}>Address</Link>
          <Link className="footer-link" to={'/'}>Privacy PoLinkcy</Link>
          <Link className="footer-link" to={'/'}>Terms & Conditions</Link>
          <Link className="footer-link" to={'/'}>Products Return</Link>
          <Link className="footer-link" to={'/'}>Wholesale Policy</Link>
        </div>
      </div>
      <div className="copyRider">
        <p>© Copyright 2024 | TopBike By <span>IlkinAkhmed</span> Powered by Af104.</p>
        <div className="cardImages">
          <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/payment.png?v=1613576066" alt="" />
        </div>
      </div>
    </footer>
  )
}

export default Footer