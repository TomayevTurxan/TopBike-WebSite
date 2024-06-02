import React, { useContext, useEffect, useState } from 'react'
import AboutHeader from '../../components/AboutHeader'
import Store from '../../components/AboutStore'
import Teams from '../../components/AboutTeams'
import Unique from '../../components/AboutUnique'
import "./index.scss"
import Loading from '../Loading'
import { userContext } from '../../context/userContext'
import { Helmet } from 'react-helmet-async'

function About({ pageLoading, setPageLoading }) {


  const { fetchBasketData, fetchWishlistData, user,fetchCurrentUser } = useContext(userContext)

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
              TopBike | About
            </title>
          </Helmet>
            <AboutHeader />
            <Unique />
            <Teams />
            <Store />
          </>

        )
      }

    </>
  )
}

export default About