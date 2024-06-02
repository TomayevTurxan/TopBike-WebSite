import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import Basket from '../components/Basket'
import MobileNavbar from '../components/movbileNavbar'

function MainLayout({ pageLoading, setPageLoading }) {

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, 2000);
    }, [])
    return (
        <>
            {!pageLoading && <Navbar />}
            <Basket />
            <Outlet />
            {!pageLoading && <Footer />}

        </>
    )
}

export default MainLayout