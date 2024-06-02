import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from '../../components/Category'
import Header from '../../components/Header'
import LatestNews from '../../components/LatestNews'
import Online from '../../components/Online'
import Modal from '../../components/ProductModal'
import Shipping from '../../components/Shipping'
import NewProduct from '../../components/newProducts'
import Login from '../../components/login'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'
import { openModal } from '../../reduxSlice/basketSlice'
import { Helmet } from 'react-helmet-async'

function HomePage({ pageLoading, setPageLoading }) {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  const { fetchBasketData, fetchWishlistData, user, fetchCurrentUser } = useContext(userContext)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchBasketData()
    fetchWishlistData()
    fetchCurrentUser()
  }, [user])



  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    setPageLoading(true)
  }, [])

  return (
    <>
      {
        pageLoading ?
          (
            <Loading />
          )
          :
          <>
            <Helmet>
              <title>
              TopBike
              </title>
            </Helmet>
            {isModalOpen && <div onClick={() => dispatch(openModal(!isModalOpen))} className="ModaloverLay"></div>}
            {isModalOpen ? <Modal /> : null}
            <Header />
            <Shipping />
            <NewProduct />
            <Online />
            <Category />
            <LatestNews />
          </>

      }

    </>
  )
}

export default HomePage