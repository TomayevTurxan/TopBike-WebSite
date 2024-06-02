import axios, { all } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import image from "../../../img/breadcrumb-shape-2.png";
import { userContext } from '../../context/userContext';
import Loading from '../../pages/Loading';
import "./index.scss";
import { useSelector } from 'react-redux';
import Comment from '../../components/Comment';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

function Details({ pageLoading, setPageLoading }) {


    const [product, setProduct] = useState(null)
    const { wishlistArr, handleBasket, handleWishlist, user, isLoading, fetchCurrentUser } = useContext(userContext)

    const [OpenCommentBox, setOpenCommentBox] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    function handleOpenComment() {
        setOpenCommentBox(!OpenCommentBox)
    }

    async function fetchData() {
        try {
            const res = await axios.get(`https://topbikewebsite.onrender.com/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            return navigate('*')
        }
    }












    useEffect(() => {
        fetchData()
        fetchCurrentUser()
        setTimeout(() => {
            setPageLoading(false);
        }, 2000);
        setPageLoading(true)
    }, [user, id]);







    const basketOpen = useSelector((state) => state.basket.isOpen)


    return (
        <>
            {
                pageLoading
                    ?
                    <Loading />
                    :
                    <>
                        <Helmet>
                            <title>
                                {product && product.title}
                            </title>
                        </Helmet>
                        {
                            product && <section className='details'>
                                {isLoading && basketOpen === false && OpenCommentBox === false ? <div className="loader"></div> : null}
                                <div className="det-head">
                                    <Comment product={product} OpenCommentBox={OpenCommentBox} handleOpenComment={handleOpenComment} id={id} />
                                    <div className='backImg' />
                                    <h3>Home <span style={{ color: "goldenrod" }}>{`> ${product.title}`}</span> </h3>
                                    <img className='bottom-img' src={image} alt="" />
                                </div>
                                <div className="det-wrapper">
                                    <div className="det-prod">
                                        <div className="det-img">
                                            <img src={`${product.img[0]}`} alt="" />
                                        </div>
                                        <div className="det-texts">
                                            <div className="det-name">
                                                <h3>{product.title}</h3>
                                                <div className="icon">
                                                    <div className='comment-icon'>
                                                        <div className="description">
                                                            <p>Add Comment</p>
                                                            <i className="fa-solid fa-caret-down"></i>
                                                        </div>
                                                        <i className="fa-regular fa-comment" onClick={handleOpenComment}></i>
                                                    </div>
                                                    <div className='comment-icon'>
                                                        <div className="description">
                                                            <p>Like</p>
                                                            <i className="fa-solid fa-caret-down"></i>
                                                        </div>
                                                        <i onClick={() => handleWishlist(product._id)} className={wishlistArr.find(x => x.product._id === id) && user ? product.addedHeartIcon : product.heartIcon}></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <p style={{ color: "goldenrod", fontSize: "1.3em", fontWeight: "bold" }}>${product.newPrice}.00 USD</p>
                                            <p style={{ color: "gray", fontSize: "1.3em" }}>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit. Qui accusantium autem voluptatum molestias rerum,
                                                eos voluptates explicabo neque, tempore, ullam atque
                                                magni quia aspernatur
                                                corrupti. Excepturi et consectetur modi provident?
                                            </p>
                                            <div className="prod-qty">
                                                <div onClick={() => {
                                                    handleBasket(product._id)
                                                }} className="add-button">
                                                    ADD TO CART
                                                </div>
                                                <div className="buy-button" onClick={() => { navigate('/checkout'), handleBasket(product._id) }}>
                                                    BUY IT NOW
                                                </div>
                                            </div>
                                            <p>Categories: <span style={{ color: "goldenrod", fontWeight: "bold" }}>{product.category}</span></p>
                                        </div>
                                    </div>
                                    <div className="choose">
                                        <div className="choose-card">
                                            <h2>Why Choose Us</h2>
                                            <p>Official Herschel stockist Australian warranty
                                                assistance & support Australian shipping &
                                                returns.Customer
                                                first experience environmentally focused
                                            </p>
                                        </div>
                                        <div className="choose-card">
                                            <h2>Returns</h2>
                                            <p>Return this product within 100 days if you change your mind. Get a refund/replacement & free return shipping if it arrives damaged or not as described</p>
                                        </div>
                                        <div className="choose-card">
                                            <h2>Shipping</h2>
                                            <p>Free if stated near price. $9.95 Australia wide (up to 10 items). $18.95 for Express Post (generally 1 business day).</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }

                    </>

            }
        </>
    )
}
export default Details
