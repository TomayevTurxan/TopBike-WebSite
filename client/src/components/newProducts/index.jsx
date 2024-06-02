import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';
import "./index.scss";
// import { addId, addToCart, openModal } from '../../reduxSlice/basketSlice';
import { addToWishlist } from '../../reduxSlice/wishlistSlice';
import { useNavigate } from 'react-router';
import { userContext } from '../../context/userContext';
import { addId, openModal } from '../../reduxSlice/basketSlice';

function NewProduct() {
    const basketOpen = useSelector((state) => state.basket.isOpen)
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const { product } = useFetchData('products/latestProducts')
    const dispatch = useDispatch()
    const isModalOpen = useSelector(state => state.basket.isModalOpen)

    const { handleBasket, handleWishlist, wishlistArr, user, isLoading } = useContext(userContext)

    return (
        <section className='newProduct'>
            {isLoading && basketOpen === false ? <div className="loader"></div> : null}
            <h1>New Product</h1>
            <div className="newWrapper">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    product && product
                        .map((item) => (
                            <div className="newCard" key={item._id}>
                                {item.sale ? <p className='sale'>SALE</p> : null}
                                <div className="productIcons">
                                    <i onClick={() => { handleBasket(item._id), user && dispatch(openModal(!isModalOpen)), user && dispatch(addId(item._id)) }} className={`${item.basketIcon}`}></i>
                                    <i onClick={() => handleWishlist(item._id)} className={wishlistArr.find(x => x.product._id === item._id) && user ? item.addedHeartIcon : item.heartIcon}></i>
                                    <i onClick={() => navigate(`/details/${item._id}`)} className={item.eyeIcon}></i>
                                </div>
                                <div className="img">
                                    <img src={image && image.id === item._id ? image.img : item.img[0]} alt="" />
                                </div>
                                <div className="newTexts">
                                    <p onClick={() => navigate(`/details/${item._id}`)}>{item.title}</p>
                                    <span>${item.newPrice}.00</span>
                                    {item.oldPrice ? <span className='oldPrice'>${item.oldPrice}.00</span> : null}
                                    {item.img.length === 2 ? (
                                        <>
                                            <img
                                                onClick={() => { setImage({ id: item._id, img: item.img[0] }) }}
                                                className={image && image.img === item.img[0] ? "smallimages border-color" : 'smallimages'}
                                                src={item.img[0]}
                                                alt=""
                                            />
                                            <img
                                                onClick={() => { setImage({ id: item._id, img: item.img[1] }) }}
                                                className={image && image.img === item.img[1] ? "smallimages two border-color" : 'smallimages two'}
                                                src={item.img[1]}
                                                alt=""
                                            />
                                        </>

                                    ) : null}
                                </div>
                            </div>

                        ))

                )
                }
            </div>
        </section >
    )
}

export default NewProduct