import React from 'react'
import "./index.scss"
import image from "../../../img/breadcrumb-shape-2.png"

function Collection() {
    const handleButtonClick = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };
    return (
        <>
            <section className='collection'>
                <div className='backImg' />
                <p>A NEW COLLECTION</p>
                <span>SALE UP TO 30%</span>
                <button onClick={handleButtonClick}>SHOP NOW</button>
                <img className='top-img' src={image} alt="" />
                <img className='bottom-img' src={image} alt="" />
            </section>

        </>
    )
}

export default Collection