import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import "./index.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import useFetchData from '../../hooks/useFetchData'
import { useDispatch, useSelector } from 'react-redux'
import { openBasket } from '../../reduxSlice/basketSlice'
import Search from '../../components/Search'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import MobileNavbar from '../../components/movbileNavbar';

function Navbar() {
  const { user, setToken, setUser, basketArr, isLoginOpen, setIsLoginOpen, wishlistArr, fetchWishlistData, fetchCurrentUser, currentUSer, token } = useContext(userContext);

  const basketOpen = useSelector((state) => state.basket.isOpen)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { product } = useFetchData('navbar')

  useEffect(() => {
    if (token === null) {
      localStorage.removeItem('user')
    }
  }, [])


  const [isSearchOpen, setisSearchOpen] = useState(false)
  const [isLoginDropDownOpen, setIsLoginDropDownOpen] = useState(false)
  const [scroll, setScroll] = useState(false);
  const [isNavOpen, setisNavOpen] = useState(false)

  useEffect(() => {
    fetchWishlistData()
    fetchCurrentUser()
  }, [])

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





  function handleScroll() {
    if (window.scrollY > 120) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  const handleLogout = () => {
    Cookies.remove('token');
    setUser(null);
    setToken(null);
    setIsLoginDropDownOpen(false);
    toast.success('Logged Out');
  };


  useEffect(() => {

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])










  return (
    <nav className={scroll ? 'navbar scroll' : 'navbar'}>
      <MobileNavbar setIsLoginOpen={setIsLoginOpen} setisNavOpen={setisNavOpen} isNavOpen={isNavOpen} />
      {product && product.map(item => (
        <div className="nav-inner" key={item._id}>
          <i onClick={() => setisNavOpen(true)} className='fa-solid fa-bars'></i>
          <div className="logo">
            <img onClick={() => navigate('/')} src={item.logo} alt="" />
          </div>
          <ul className='nav-texts'>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/">{item.navTexts[0]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <div className="message">
                {item.hot ? 'Hot' : ''}
              </div>
              <NavLink className={'navLink'} to="/shop">{item.navTexts[1]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/about">{item.navTexts[2]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/blog">{item.navTexts[3]}</NavLink>
              <div className="underLine"></div>
            </li>
            <li className='nav-ul-li'>
              <NavLink className={'navLink'} to="/contact">{item.navTexts[4]}</NavLink>
              <div className="underLine"></div>
            </li>
          </ul>
          <div className="nav-icons">
            <i onClick={() => setisSearchOpen(!isSearchOpen)} className="fa-solid fa-search"></i>
            {
              user
                ?
                <div className='profile-img'>
                  {isLoginDropDownOpen && <div className="overLay" onClick={() => setIsLoginDropDownOpen(!isLoginDropDownOpen)} ></div>}

                  <img
                    onClick={() => setIsLoginDropDownOpen(!isLoginDropDownOpen)}
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
                <i onClick={() => setIsLoginOpen(!isLoginOpen)} className={item.navIcons[0]}></i>
            }
            <i onClick={() => navigate('/wishlist')} className={item.navIcons[1]}>
              <div className={user && "cartMessage"}>
                {user && wishlistArr.length}
              </div>
            </i>
            <i onClick={() => dispatch(openBasket(!basketOpen))} className={item.navIcons[2]}>
              <div className={user && "cartMessage"}>
                {user && basketArr.length}
              </div>
            </i>
          </div >

        </div>
      ))
      }
      <Search isSearchOpen={isSearchOpen} setisSearchOpen={setisSearchOpen} />
    </nav >
  )
}

export default Navbar