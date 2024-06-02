import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/userContext'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import useFetchData from '../../hooks/useFetchData'
import { NavLink } from 'react-router-dom'
import "./index.scss"
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import axios from 'axios'

function MobileNavbar({ setisNavOpen, isNavOpen, setIsLoginOpen }) {
    const { currentUSer, user, wishlistArr, basketArr, setUser, setToken, fetchCurrentUser, fetchWishlistData } = useContext(userContext)
    const basketOpen = useSelector((state) => state.basket.isOpen)
    const [isLoginDropDownOpen, setIsLoginDropDownOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { product } = useFetchData('navbar')

    async function handleProfileImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await axios.post(`https://topbikewebsite.onrender.com/user/${user._id}/addProfileImage`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (res.status === 200) {
                    toast.success("Image Uploaded");
                } else {
                    toast.error("Error Occurred");
                }
            } catch (error) {
                toast.error(error.message);
            }
            await fetchCurrentUser()
            setIsLoginDropDownOpen(false)
        }
    }


    useEffect(() => {
        fetchWishlistData()
        fetchCurrentUser()
    }, [])


    const handleLogout = () => {
        Cookies.remove('token');
        setUser(null);
        setToken(null);
        setIsLoginDropDownOpen(false);
        toast.success('Logged Out');
    };

    return (
        <>
            {isNavOpen && <div className='mobOverLay' onClick={() => setisNavOpen(false)}></div>}
            <div className={`mob-nav ${isNavOpen ? 'nav-open' : ''}`}>
                {
                    product && product.map(item => (
                        <div className="mob-nav-inner" key={item._id}>
                            <div className="mob-nav-icons">

                                <i onClick={() => { navigate('/wishlist'), setisNavOpen(false) }} className={item.navIcons[1]}>
                                    <div className={user && "cartMessage"}>
                                        {user && wishlistArr.length}
                                    </div>
                                </i>
                                <i onClick={() => { dispatch(openBasket(!basketOpen)), setisNavOpen(false) }} className={item.navIcons[2]}>
                                    <div className={user && "cartMessage"}>
                                        {user && basketArr.length}
                                    </div>
                                </i>
                                {
                                    user
                                        ?
                                        <div className='profile-img'>
                                            {isLoginDropDownOpen && <div className="overLay" onClick={() => setIsLoginDropDownOpen(false)} ></div>}
                                            <img
                                                onClick={() => setIsLoginDropDownOpen(true)}
                                                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                src={`${currentUSer.profileImg
                                                    ?
                                                    currentUSer.profileImg
                                                    :
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                alt="" />
                                            <div className={`profile-sub-menu ${isLoginDropDownOpen && 'profileActive'}`}>

                                                <div onClick={handleLogout}>
                                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                    <p>Log Out</p>
                                                </div>
                                                <div className='changeImage'>
                                                    <i className="fa-regular fa-image"></i>  <label htmlFor="profileImageInput">Change Profile Image</label>
                                                    <input
                                                        type="file"
                                                        name="profileImg"
                                                        onChange={(e) => handleProfileImageChange(e)}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        :
                                        <i onClick={() => setIsLoginOpen(true)} className={item.navIcons[0]}></i>
                                }
                                <i className='fa-solid fa-xmark' onClick={() => setisNavOpen(false)}></i>
                            </div>
                            <ul className="mob-nav-texts">

                                <li className='mob-nav-ul-li'>
                                    <NavLink onClick={() => setisNavOpen(false)} className={'mobNavLink'} to="/">{item.navTexts[0]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink onClick={() => setisNavOpen(false)} className={'mobNavLink'} to="/shop">{item.navTexts[1]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink onClick={() => setisNavOpen(false)} className={'mobNavLink'} to="/about">{item.navTexts[2]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink onClick={() => setisNavOpen(false)} className={'mobNavLink'} to="/blog">{item.navTexts[3]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                                <li className='mob-nav-ul-li'>
                                    <NavLink onClick={() => setisNavOpen(false)} className={'mobNavLink'} to="/contact">{item.navTexts[4]}</NavLink>
                                    <div className="underLine"></div>
                                </li>
                            </ul>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MobileNavbar