import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'
import Stripe from '../../components/stripe'
import { Helmet } from 'react-helmet-async'

function CheckOut({ pageLoading, setPageLoading }) {
    const { basketArr, fetchBasketData, fetchWishlistData, user } = useContext(userContext)
    const subTotal = basketArr.reduce((initial, data) => initial + parseInt(data.product.newPrice * data.count), 0)

    useEffect(() => {
        fetchBasketData()
        fetchWishlistData()
        setTimeout(() => {
            setPageLoading(false);
        }, 2000);
        setPageLoading(true)
    }, [user])
    return (
        <>
            {pageLoading ? <Loading /> :
                (
                    <>
                        <Helmet>
                            <title>
                            TopBike | Checkout
                            </title>
                        </Helmet>
                        <section id='checkOut'>
                            <div className="leftBox">
                                <div className="paymentBox">
                                    <p>Payment</p>
                                    <span>All transactions are secure and encrypted.</span>
                                    <div className="storeBox">
                                        <i className="fa-regular fa-money-bill-1"></i>
                                        <p>This store can’t accept payments right now.</p>
                                    </div>
                                    <Stripe />
                                </div>
                            </div>
                            <div className="rightBox">
                                {basketArr && basketArr.map(item => (
                                    <div className="upBox" key={item._id}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                            <div className="imgBox">
                                                <img src={item.product.img[0]} alt="" />
                                                <div className="countBox">
                                                    {item.count}
                                                </div>
                                            </div>
                                            <div className="textBox">
                                                <h1>{item.product.title}</h1>
                                                <p>Matte Grey</p>
                                            </div>
                                        </div>
                                        <div className="priceBox">
                                            <p>${item.product.newPrice}.00</p>
                                        </div>
                                    </div>

                                ))}

                                <div className="downBox">
                                    <div className="normalBox">
                                        <p>Cart Subtotal</p>
                                        <p>${subTotal}.00</p>
                                    </div>
                                    <div className="normalBox">
                                        <p>Shipping</p>
                                        <p>Free</p>
                                    </div>
                                    <div className="normalBox">
                                        <h2>Total</h2>
                                        <div className="box">
                                            <span>USD</span>
                                            {basketArr.length !== 0 ? <p>${subTotal}.00</p> : <p>$0.00</p>}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </>

                )
            }
        </>
    )
}

export default CheckOut