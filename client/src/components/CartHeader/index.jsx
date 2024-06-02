import React from 'react'
import image from "../../../img/breadcrumb-shape-2.png"
import "./index.scss"

function CartHeader() {
    return (
        <div className='cart-header'>
            <div className='header-bg-img'  />
            <h1>Cart</h1>
            <p>Home / <span style={{ color: "goldenrod" }}>Cart</span></p>
            <img className='bottom-img' src={image} alt="" />
        </div>
    )
}

export default CartHeader