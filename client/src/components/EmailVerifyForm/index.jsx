import React, { useContext, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.scss"
import axios from 'axios';
import toast from 'react-hot-toast';
import { userContext } from '../../context/userContext';
import { setCookie } from '../../../helper/cookies';
import { jwtDecode } from 'jwt-decode';

function VerifyForm({ setIsVerifyFormOpen, userValues, setIsLoginOpen }) {
    const { fetchBasketData, fetchWishlistData, setUser, setToken } = useContext(userContext)

    const handleRegister = async (values) => {
        const res = await axios.post('https://topbikewebsite.onrender.com/verifyEmail', {
            email: userValues.email,
            code: values.code
        })
        if (res.status !== 200) {
            return toast.error('Invalid verification code')
        }
        try {
            const res = await axios.post('https://topbikewebsite.onrender.com/register', userValues)
            res.status === 200 && setToken(res.data)
            res.status === 200 && setCookie("token", res.data, "600h")
            const decoded = res.status === 200 && jwtDecode(res.data);
            setUser(decoded)
            setIsLoginOpen(false)
            await fetchBasketData()
            await fetchWishlistData()
            toast.success('Successfully Registered!')
        } catch (error) {
            toast.error("Email already exist!! Please Try other Email")
        }
    }





    return (
        <div className='verifyForm'>
            <h1>Verify Email</h1>
            <Formik
                initialValues={{ code: '' }}
                validationSchema={Yup.object({
                    code: Yup.string()
                        .max(4, 'Must be 4 characters or less')
                        .min(4, 'Must be 4 characters or more')
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    handleRegister(values)
                    resetForm()
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form
                >
                    <label htmlFor="code">Code</label>
                    <Field name="code" type="number" />
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="code" />
                    </div>
                    <button type="submit">Verify</button>
                </Form>
            </Formik>
            <p onClick={() => setIsVerifyFormOpen(false)} className='backregister'>Back to Register</p>
        </div>
    )
}

export default VerifyForm