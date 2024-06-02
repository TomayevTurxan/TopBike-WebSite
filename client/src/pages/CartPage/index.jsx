import React, { useContext, useEffect, useState } from 'react';
import CartHeader from '../../components/CartHeader';
import CartProduct from '../../components/CartProducts';
import Loading from '../Loading';
import { userContext } from '../../context/userContext';
import { Helmet } from 'react-helmet-async';

function Cart({ pageLoading, setPageLoading }) {

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
                        TopBike | Cart
                        </title>
                    </Helmet>
                    <CartHeader />
                    <CartProduct />
                </>

            }
        </>
    )
}

export default Cart