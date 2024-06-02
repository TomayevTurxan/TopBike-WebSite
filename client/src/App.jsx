import { useContext, useEffect, useState } from 'react'
import { Toaster } from "react-hot-toast"
import { Route, Routes } from 'react-router'
import './App.css'
import Dashboard from './components/Dashboard'
import Details from './components/Details'
import Products from './components/Products'
import Users from './components/Users'
import Comments from './components/adminComments'
import Login from './components/login'
import { userContext } from './context/userContext'
import MainLayout from './layouts/MainLayout'
import About from './pages/About'
import Blog from './pages/Blog'
import Cart from './pages/CartPage'
import Contact from './pages/Contact'
import Error from './pages/Error'
import HomePage from './pages/HomePage/HomePage'
import Shop from './pages/Shop'
import Wishlist from './pages/WishlistPage'
import CheckOut from './pages/checkoutPage'
import AdminRouter from './routes/AdminRouter'
import PrivateRoute from './routes/privateRoute'
function App() {

  const { isLoginOpen } = useContext(userContext)

  const [pageLoading, setPageLoading] = useState(true)


  return (
    <><Toaster
      position="top-left"
      reverseOrder={false}
    />
      {isLoginOpen ? <Login /> : null}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route element={<MainLayout pageLoading={pageLoading} setPageLoading={setPageLoading} />}>
          <Route path="/" element={<HomePage pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route element={<PrivateRoute />}>
            <Route path="/contact" element={<Contact pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
            <Route path="/cart" element={<Cart pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
            <Route path="/wishlist" element={<Wishlist pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          </Route>
          <Route path="/shop" element={<Shop pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route path="/about" element={<About pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route path="/blog" element={<Blog pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route path="/details/:id" element={<Details pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
        </Route>
        <Route path="/checkout" element={<CheckOut pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
        <Route element={<AdminRouter />} >
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/dashboard/users' element={<Users />} />
          <Route path='/dashboard/comments' element={<Comments />} />
          <Route path='/dashboard/products' element={<Products />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
