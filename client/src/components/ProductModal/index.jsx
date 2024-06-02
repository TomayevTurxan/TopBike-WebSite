import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { openModal } from '../../reduxSlice/basketSlice'
import "./index.scss"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'









function Modal() {
    const { basketArr } = useContext(userContext)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState([])
    const [addedData, setAddedData] = useState(null)
    const id = useSelector(state => state.basket.id)







    async function fetchData() {
        const res = await axios.get('https://topbikewebsite.onrender.com/products')
        setData(res.data)
    }

    async function fetchAddedData() {
        const res = await axios.get(`https://topbikewebsite.onrender.com/products/${id}`)
        setAddedData(res.data)
    }


    useEffect(() => {
        fetchData()
        fetchAddedData()
    }, [id])


    const isModalOpen = useSelector(state => state.basket.isModalOpen)


    const findedDataInCart = basketArr.find(x => x.product._id === id)


    const subTotal = basketArr.reduce((initial, data) => initial + parseInt(data.product.newPrice * data.count), 0)



    return (
        <div className='modal'>
            <i onClick={() => dispatch(openModal(!isModalOpen))} className='fa-solid fa-xmark'></i>
            {
                addedData &&
                <>
                    <div className="top">
                        <div className="added">
                            <p>
                                <i className='fa-solid fa-check'></i>
                                {findedDataInCart && findedDataInCart.count !== 1 ? 'Already In Cart!!!. Count Of Product Increased' : !addedData.count && 'Added To Cart Sucessfully'}
                            </p>
                            <img src={addedData.img[0]} alt="" />
                            <h5>{addedData.title}</h5>
                            <p>Price: <span style={{ color: "goldenrod" }}>${addedData.newPrice}.00</span></p>
                            <p>QTY: <span style={{ color: "goldenrod" }}>{findedDataInCart ? findedDataInCart.count : 1}</span></p>
                            <p>Product Total: <span style={{ color: "goldenrod" }}>${addedData.total}.00</span></p>
                        </div>
                        <div className="continue">
                            <p>There are <span style={{ color: "goldenrod" }}>{basketArr.length}</span> items in  your cart</p>
                            <h3>Cart Totals: <span style={{ color: "goldenrod" }}>${subTotal}.00</span></h3>
                            <button onClick={() => dispatch(openModal(!isModalOpen))}>CONTINUE SHOPPING</button>
                            <button onClick={() => { dispatch(openModal(!isModalOpen)), navigate('/cart') }}>GO TO CART</button>
                            <p>
                                <input style={{ marginRight: "10px", cursor: "pointer" }} onChange={() => setIsChecked(!isChecked)} type="checkbox" />
                                Agree with term and conditional.
                            </p>
                            <button
                                onClick={() => { navigate('/checkout'), dispatch(openModal(!isModalOpen)) }}
                                disabled={!isChecked}
                                className={`${isChecked ? '' : 'disabled-button'}`}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                    <div className="bottom">
                        <i style={{ fontSize: '1.3em', fontWeight: 'bold' }}>You can aslo buy other <span style={{ color: "goldenrod" }}>{addedData.category}'s:</span></i>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={50}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper-modal"
                        >
                            {
                                data
                                    .filter(x => x.category === addedData.category)
                                    .map(item => (
                                        <SwiperSlide className={'modal-card'} key={item._id}>
                                            <div className="modal-img">
                                                <img onClick={() => { navigate(`/details/${item._id}`), dispatch(openModal(!isModalOpen)) }} src={item.img[0]} alt="" />
                                            </div>
                                        </SwiperSlide>
                                    ))
                            }
                        </Swiper>
                    </div>
                </>
            }
        </div >
    )
}

export default Modal