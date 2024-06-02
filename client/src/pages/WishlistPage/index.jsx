import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WishlistHeader from '../../components/WishlistHeader'
import "./index.scss"
import { removeProduct } from '../../reduxSlice/wishlistSlice'
import { Link } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import Loading from '../Loading'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'

function Wishlist({ pageLoading, setPageLoading }) {
    const { wishlistArr, handleBasket, fetchWishlistData, user, decoded, isLoading, setIsLoading, fetchBasketData, fetchCurrentUser } = useContext(userContext)

    useEffect(() => {
        fetchWishlistData()
        fetchBasketData()
        fetchCurrentUser()
    }, [user])

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 2000);
        setPageLoading(true)
    }, [])

    async function handleDelete(id) {
        try {
            setIsLoading(true)
            await axios.delete(`https://topbikewebsite.onrender.com/users/${decoded._id}/deletewish`, {
                data: {
                    productId: id
                }
            })
            setIsLoading(false)
            await fetchWishlistData()
            toast.success("Product has been deleted")
        } catch (error) {
            toast.error(`${error.message}`)
        }
    }

    const basketOpen = useSelector((state) => state.basket.isOpen)


    return (
        <>
            {
                pageLoading ? (
                    <Loading />
                ) : (
                    <>
                    <Helmet>
                        <title>
                        TopBike | Wishlist
                        </title>
                    </Helmet>
                        <section className='wishlist'>
                            {isLoading && basketOpen === false ? <div class="loader"></div> : null}
                            <WishlistHeader />
                            <div className="head">
                                <h1>My Favorites</h1>
                                <i className='fa-regular fa-heart'></i>
                            </div>
                            <div className="wishlist-wrapper">
                                {wishlistArr && wishlistArr.map(item => (
                                    <div className="wishlist-card" key={item._id}>
                                        <div className="img">
                                            <img src={item.product.img[0]} alt="" />
                                        </div>
                                        <div className="product-name">
                                            <p>{item.product.title}</p>
                                        </div>
                                        <div className="product-price">
                                            <p>${item.product.newPrice}.00</p>
                                        </div>
                                        <button onClick={() => handleBasket(item.product._id)}>Add To Cart</button>
                                        <i onClick={() => handleDelete(item.product._id)} className='fa-solid fa-trash-can'></i>
                                    </div>
                                ))}
                                {wishlistArr && wishlistArr.length === 0 ? (
                                    <>
                                        <h1>Your Wishlist Cart Is Empty Currently</h1>
                                        <Link style={{ marginTop: "20px", textDecoration: "underLine" }} to={'/shop'}>continue shopping</Link>
                                    </>
                                ) : null}
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Wishlist


