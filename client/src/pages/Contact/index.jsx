import React, { useContext, useEffect, useState } from 'react'
import ContactHeader from '../../components/ContactHeader'
import Form from '../../components/ContactForm'
import Loading from '../Loading'
import { userContext } from '../../context/userContext'
import { Helmet } from 'react-helmet-async'

function Contact({ pageLoading, setPageLoading }) {
  const { fetchCurrentUser, user } = useContext(userContext)
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
        <>
          <Helmet>
            <title>
            TopBike | Contact
            </title>
          </Helmet>
          <ContactHeader />
          <Form />
        </>
      }
    </>
  )
}

export default Contact