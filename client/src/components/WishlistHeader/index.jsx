import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"

function WishlistHeader() {
    return (
        <section className='wishlist-header'>
            <div className='header-bg-img' />
            <h1>Wishlist</h1>
            <p>Home / <span style={{ color: "goldenrod" }}>Wishlist</span></p>
            <img className='bottom-img' src={image} alt="" />
        </section>
    )
}

export default WishlistHeader