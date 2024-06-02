import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { CategoryContext } from '../../context/categoryContext'
import { userContext } from '../../context/userContext'
import useFetchData from '../../hooks/useFetchData'
import { addId, openModal } from '../../reduxSlice/basketSlice'
import FilterArea from '../ShopFilterArea'
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';

import 'swiper/css/pagination';
import "./index.scss"

function ShopProducts() {
    const [image, setImage] = useState(null)
    const { product } = useFetchData('products')
    const [isFilterAreOpen, setIsFilterAreOpen] = useState(false)
    const [isSubMenuOpen, setisSubMenuOpen] = useState(false)
    const [priceInputValue, setpriceInputValue] = useState(5000)
    const { wishlistArr, handleBasket, handleWishlist, fetchWishlistData, user, fetchBasketData, isLoading } = useContext(userContext)
    const [sortedData, setSortedData] = useState(null);
    const [isRespFilterOpen, setisRespFilterOpen] = useState(false)

    const { sizeCategory, colorCategory, category } = useContext(CategoryContext)




    const isModalOpen = useSelector(state => state.basket.isModalOpen)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetchWishlistData()
            fetchBasketData()
        }
    }, [user])




    function checkTypeOfProperty(item) {
        if (typeof item === "string") {
            return item.toLowerCase();
        }
        return item;
    }






    const basketOpen = useSelector((state) => state.basket.isOpen)
    return (
        <section className='shop-products'>
            {isSubMenuOpen && <div className='overLay' onClick={() => setisSubMenuOpen(false)}></div>}
            {isLoading && basketOpen === false ? <div className="loader"></div> : null}
            <div className="filter-area">
                <div onClick={() => { setIsFilterAreOpen(!isFilterAreOpen), setisRespFilterOpen(true) }} className="filter">
                    <i className="fa-solid fa-filter"></i>
                    <p>FILTER</p>
                </div>
                <div className="featured">
                    <div className="sort" onClick={() => setisSubMenuOpen(!isSubMenuOpen)}>
                        <p>Featured</p>
                        <i className={`fa-solid ${isSubMenuOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                    </div>
                    <ul className={`featured-subMenu ${isSubMenuOpen ? 'featured-subMenu-open' : ''}`}>
                        <li onClick={() => { setSortedData(null), setisSubMenuOpen(false) }} style={{ cursor: 'pointer' }}>Default</li>
                        <li onClick={() => { setSortedData({ property: "title", asc: true }), setisSubMenuOpen(false) }} style={{ cursor: 'pointer' }}>Alphabetically, A-z</li>
                        <li onClick={() => { setSortedData({ property: "title", asc: false }), setisSubMenuOpen(false) }} style={{ cursor: 'pointer' }}>Alphabetically, z-A</li>
                        <li onClick={() => { setSortedData({ property: "newPrice", asc: false }), setisSubMenuOpen(false) }} style={{ cursor: 'pointer' }}>Price, high to low</li>
                        <li onClick={() => { setSortedData({ property: "newPrice", asc: true }), setisSubMenuOpen(false) }} style={{ cursor: 'pointer' }}>Price, low to high</li>
                    </ul>
                </div>
            </div>
            <FilterArea isRespFilterOpen={isRespFilterOpen} setisRespFilterOpen={setisRespFilterOpen} priceInputValue={priceInputValue} setpriceInputValue={setpriceInputValue} isFilterAreaOpen={isFilterAreOpen} />
            <div className="product-area">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    product && product
                        .filter(x => x.newPrice < parseInt(priceInputValue, 10))
                        .filter(item => item.category.toLowerCase() === category || category === 'all')
                        .filter(item => item.size === sizeCategory || sizeCategory === 'all')
                        .filter(item => item.color === colorCategory || colorCategory === 'all')
                        .sort((a, b) => {
                            if (sortedData && sortedData.asc) {
                                return checkTypeOfProperty(a[sortedData.property]) >
                                    checkTypeOfProperty(b[sortedData.property])
                                    ? 1
                                    : checkTypeOfProperty(b[sortedData.property]) >
                                        checkTypeOfProperty(a[sortedData.property])
                                        ? -1
                                        : 0;
                            } else if (sortedData && sortedData.asc === false) {
                                return checkTypeOfProperty(a[sortedData.property]) >
                                    checkTypeOfProperty(b[sortedData.property])
                                    ? -1
                                    : checkTypeOfProperty(b[sortedData.property]) >
                                        checkTypeOfProperty(a[sortedData.property])
                                        ? 1
                                        : 0;
                            } else {
                                return 0;
                            }
                        })
                        .map((item) => (
                            <div
                                key={item._id}
                                className="newCard">
                                {item.sale ? <p className='sale'>SALE</p> : null}
                                <div className="productIcons">
                                    <i onClick={() => { handleBasket(item._id), user && dispatch(openModal(!isModalOpen)), user && dispatch(addId(item._id)) }} className={`${item.basketIcon}`}></i>
                                    <i onClick={() => handleWishlist(item._id)} className={wishlistArr.find(x => x.product._id === item._id && user) ? item.addedHeartIcon : item.heartIcon}></i>
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
export default ShopProducts


