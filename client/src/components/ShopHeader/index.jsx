import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"

function ShopHeader() {
    return (
        <header className='shop-header'>
            <img className='backImg' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/slider2.jpg?v=1613576060" alt="" />
            <h1>Products</h1>
            <p>Home /<span> Products</span></p>
            <img className='bottom-img' src={image} alt="" />
        </header>
    )
}

export default ShopHeader