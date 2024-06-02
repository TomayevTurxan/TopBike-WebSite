import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"
import {Link} from "react-router-dom"

function AboutHeader() {
    return (
        <section id='aboutUpSection'>
            <h3>About Us</h3>
            <div>
                <Link to={"/"} style={{ color: 'black', textDecoration: "none" }}>
                    <p>Home</p>
                </Link>
                <span style={{ color: "white ", fontSize: '40px' }}>/</span>
                <span>About Us</span>
            </div>
        </section>
    )
}

export default AboutHeader