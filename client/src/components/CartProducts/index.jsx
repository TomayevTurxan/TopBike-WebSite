import React, { useContext } from 'react'
import "./index.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import axios from 'axios'

function CartProduct() {
    const { basketArr, decoded, setIsLoading, isLoading, fetchBasketData } = useContext(userContext)

    const subTotal = basketArr.reduce((initial, data) => initial + parseInt(data.product.newPrice * data.count), 0)


    
    const navigate = useNavigate()

    const modifyCount = async (id, type) => {
        try {
            if (type) {
                setIsLoading(true)
                await axios.post(`https://topbikewebsite.onrender.com/users/${decoded._id}/increaseCount`, {
                    productId: id
                })
                setIsLoading(false)
                toast.success('Count Increased')
                await fetchBasketData()
            } else {
                const res = await axios.post(`https://topbikewebsite.onrender.com/users/${decoded._id}/decreaseCount`, {
                    productId: id
                })
                res.status === 201 ? toast.error('Count must be 1 or more') : toast.success('Count Increased')
                await fetchBasketData()
            }

        } catch (error) {
            toast.error(`Error ${error.message}`)
        }
    }

    async function handleDelete(id) {
        try {
            setIsLoading(true)
            await axios.delete(`https://topbikewebsite.onrender.com/users/${decoded._id}/delete`, {
                data: {
                    productId: id
                }
            })
            setIsLoading(false)
            await fetchBasketData()
            toast.success("Product has been deleted")
        } catch (error) {
            toast.error(`${error.message}`)
        }
    }
    const basketOpen = useSelector((state) => state.basket.isOpen)


    return (
        <section className='cart-product'>

            {
                basketArr.length > 0 ? (
                    <>
                {isLoading && basketOpen === false ? <div class="loader"></div> : null}
                        <div className="product-details">
                            <div className="product-properties">
                                <div className="name">
                                    <p>PRODUCT NAME</p>
                                </div>
                                <div className="price">
                                    <p>PRICE</p>
                                </div>
                                <div className="quantity">
                                    <p>QUANTITY</p>
                                </div>
                                <div className="total">
                                    <p>TOTAL</p>
                                </div>
                                <span></span>
                            </div>
                            {basketArr.map(item => (
                                <div className="products" key={item.product._id}>
                                    <div className="prod-img-name">
                                        <div className="img">

                                            <img src={item.product.img[0]} alt="" />
                                        </div>
                                        <p>{item.product.title}</p>
                                    </div>
                                    <div className="prod-price">
                                        <p>${item.product.newPrice}.00</p>
                                    </div>
                                    <div className="prod-qty">
                                        <div className="counter">
                                            <p className='count'>{item.count}</p>
                                            <div className="plus-minus">
                                                <p onClick={() => modifyCount(item._id, true)}>+</p>
                                                <p onClick={() => modifyCount(item._id, false)}>-</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="prod-total">
                                        <p>${item.product.newPrice}.00</p>
                                    </div>
                                    <i onClick={() => handleDelete(item._id)} className='fa-solid fa-trash-can'></i>
                                </div>
                            ))}
                        </div>
                        <div className="cart-buttons">
                            <button onClick={() => navigate('/shop')}>UPDATE CART</button>
                            <button onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
                        </div>
                        <div className="cart-total">
                            <p className='total'>CART SUBTOTALS</p>
                            <hr />
                            <div className="subtotal">
                                <p>Subtotal: </p>
                                <b>${subTotal}.00</b>
                            </div>
                            <button onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT</button>
                        </div>
                    </>
                ) : (
                    <div div style={{ width: "100%", textAlign: "center" }}>
                        <h1>Your Cart Is Empty Currently</h1>
                        <Link style={{ marginTop: "20px", textDecoration: "underLine" }} to={'/shop'}>continue shopping</Link>
                    </div>
                )
            }
        </section>
    )
}

export default CartProduct

