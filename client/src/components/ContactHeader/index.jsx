import React from 'react'
import image from "../../../img/breadcrumb-shape-2.png"
import "./index.scss"

function ContactHeader() {
    return (
        <section className='contact-hader'>
            <div className='header-bg-img' />
            <h1>Contact US</h1>
            <p>Home / <span style={{ color: "goldenrod" }}>Contact Us</span></p>
            <img className='bottom-img' src={image} alt="" />
        </section>
    )
}

export default ContactHeader