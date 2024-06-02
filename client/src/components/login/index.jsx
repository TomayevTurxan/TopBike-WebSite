import React, { useContext, useState } from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.scss"
import toast from 'react-hot-toast';
import axios from 'axios';
import { setCookie } from '../../../helper/cookies';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode"
import VerifyForm from '../EmailVerifyForm';
import ResetPasswordForm from '../ResetPasswordForm';

function Login() {
    const { token, setUser, setToken, fetchBasketData, isLoginOpen, setIsLoginOpen, fetchWishlistData, fetchCurrentUser } = useContext(userContext);
    const navigate = useNavigate();

    const [changeForm, setChangeForm] = useState(true)
    const [userValues, setUserValues] = useState([])
    const [isVerifyFormOpen, setIsVerifyFormOpen] = useState(false)
    const [isResetFormOpen, setIsResetFormOpen] = useState(false)
    const [isPasswordOpen, setIsPasswordOpen] = useState(false)



    // LOGIN
    const handleLogin = async (values, resetForm) => {
        try {
            const res = await axios.post('https://topbikewebsite.onrender.com/login', values)
            toast.success('Successfully Logined!')
            res.status === 200 && setToken(res.data)
            res.status === 200 && setCookie("token", res.data, "600h")
            const decoded = res.status === 200 && jwtDecode(res.data);
            setUser(decoded)
            setIsLoginOpen(!isLoginOpen)
            await fetchBasketData()
            await fetchCurrentUser()
            await fetchWishlistData()
            resetForm()
        } catch (error) {
            toast.error("Wrong Details")
        }
    }



    async function handleSubmit(userValues, resetForm) {
        const response = await axios.post('https://topbikewebsite.onrender.com/checkUser', {
            email: userValues.email
        })
        if (response.status === 200) {
            setUserValues(userValues)
            sendVerifyEmail(userValues.email, resetForm)
            setIsVerifyFormOpen(true)
        } else {
            toast.error(response.data)
        }
    }

    async function sendVerifyEmail(email, resetForm) {
        try {
            const res = await axios.post('https://topbikewebsite.onrender.com/sendVerificationCode', {
                email: email
            })
            if (res.status === 200) {
                toast.success('Verivication Code Sent, Please Enter Code')
                resetForm()
            } else {
                toast.error('Invalid Email')
            }
        } catch (error) {
            toast.error('Invalid Email')
        }
    }


    return (
        <div className='login-bg' >
            <div className="overLay" onClick={() => setIsLoginOpen(!isLoginOpen)}></div>
            <div className="login-form">
                {changeForm ? (
                    <>
                        <i onClick={() => setIsLoginOpen(!isLoginOpen)} className="fa-solid fa-xmark"></i>
                        <img src="https://topbike-store-demo.myshopify.com/cdn/shop/files/LOGO.png?v=1613575279" alt="" />
                        <hr />
                        <h3>Great to have you back!</h3>
                        {isResetFormOpen && <ResetPasswordForm setIsResetFormOpen={setIsResetFormOpen} />}
                        <Formik
                            initialValues={{ password: '', email: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .min(6, 'Too Short')
                                    .required('Required'),
                                password: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .min(8, 'Must be 8 characters or more')
                                    .required('Required')
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleLogin(values, resetForm)
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            <Form
                            >
                                <label htmlFor="email">Email Address</label>
                                <Field name="email" type="email" />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="email" />
                                </div>

                                <label htmlFor="password">Password</label>
                                <Field name="password" type={isPasswordOpen ? "text" : "password"} />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="password" />
                                </div>
                                <label htmlFor="" className='label'>
                                    <input onChange={() => setIsPasswordOpen(!isPasswordOpen)} className='' type="checkBox" />
                                    Show Password
                                </label>
                                <button type="submit">LOG IN</button>
                            </Form>
                        </Formik>
                        <p className='forgot' onClick={() => setIsResetFormOpen(true)}>Forgot your Password?</p>
                        <p className='account'>Don’t have an account? <span onClick={() => setChangeForm(!changeForm)} >Register now</span></p>
                    </>
                ) : (
                    <>
                        <i onClick={() => setIsLoginOpen(!isLoginOpen)} className="fa-solid fa-xmark"></i>
                        <h3>REGISTER</h3>
                        {isVerifyFormOpen && <VerifyForm userValues={userValues} setIsLoginOpen={setIsLoginOpen} setIsVerifyFormOpen={setIsVerifyFormOpen} />}
                        <Formik
                            initialValues={{ password: '', email: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .min(6, 'Too Short')
                                    .required('Required'),
                                password: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .min(8, 'Must be 8 characters or more')
                                    .required('Required')
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                handleSubmit(values, resetForm)
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            <Form
                            >
                                <label htmlFor="email">Email Address</label>
                                <Field name="email" type="email" />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="email" />
                                </div>

                                <label htmlFor="password">Password</label>
                                <Field name="password" type={isPasswordOpen ? "text" : "password"} />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="password" />
                                </div>
                                <label htmlFor="" className='label'>
                                    <input onChange={() => setIsPasswordOpen(!isPasswordOpen)} className='' type="checkBox" />
                                    Show Password
                                </label>
                                <button type="submit">REGISTER</button>
                            </Form>
                        </Formik>
                        <p className='log' onClick={() => setChangeForm(true)}>Already a member? <span>Log in here.</span></p>

                    </>
                )}
            </div>
        </div>
    )
}

export default Login