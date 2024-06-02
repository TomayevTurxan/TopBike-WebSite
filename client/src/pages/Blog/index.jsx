import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'
import NotMeanSection from '../../components/notMeanSection'
import BlogsUpSection from '../../components/blogsUpSection'
import BlogsDownSection from '../../components/blogsDownSection'
import { Helmet } from 'react-helmet-async'

function Blog({ pageLoading, setPageLoading }) {


  const { fetchBasketData, fetchWishlistData, user, fetchCurrentUser } = useContext(userContext)

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
      {pageLoading ? <Loading /> :
        (
          <>
            <Helmet>
              <title>
              TopBike | Blog
              </title>
            </Helmet>
            <BlogsUpSection />
            <BlogsDownSection />
          </>

        )
      }

    </>
  )
}

export default Blog