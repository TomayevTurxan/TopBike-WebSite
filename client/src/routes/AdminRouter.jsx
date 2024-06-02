import React, { useContext } from 'react'
import AdminNavbar from '../components/AdminPageNavbar'
import { Navigate, Outlet } from 'react-router'
import { userContext } from '../context/userContext'

function AdminRouter() {
    const { user } = useContext(userContext)

    if (user && user.role === 'admin') {
        return (
            <>
                <AdminNavbar />
                <div className='main'>
                    <Outlet />
                </div>
            </>
        )

    } else {
        return (
            <Navigate to={'*'} />
        )
    }
}

export default AdminRouter