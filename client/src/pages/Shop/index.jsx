import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import ShopHeader from '../../components/ShopHeader'
import Collection from '../../components/ShowCollection'
import ShopProducts from '../../components/ShopProducts'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../components/ProductModal'
import { userContext } from '../../context/userContext'
import Loading from '../Loading'
import { openModal } from '../../reduxSlice/basketSlice'
import { Helmet } from 'react-helmet-async'

function Shop({ pageLoading, setPageLoading, OpenCommentBox }) {
  const isModalOpen = useSelector(state => state.basket.isModalOpen)
  const { fetchCurrentUser, user } = useContext(userContext)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchCurrentUser()
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
              TopBike | Shop
              </title>
            </Helmet>
            {isModalOpen && <div onClick={() => dispatch(openModal(!isModalOpen))} className="ModaloverLay"></div>}
            {isModalOpen ? <Modal /> : null}
            <ShopHeader />
            <Collection />
            <ShopProducts OpenCommentBox={OpenCommentBox} />
          </>

        )
      }
    </>
  )
}

export default Shop