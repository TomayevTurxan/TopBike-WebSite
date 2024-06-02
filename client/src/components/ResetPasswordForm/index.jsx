import React, { useState } from 'react'
import "./index.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

function ResetPasswordForm({ setIsResetFormOpen }) {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false)


    const handleResetPassword = async (values, resetForm) => {
        try {
            if (values.password !== values.confirmPassword) {
                toast.error("Password and ConfirmPassowrd do not match");
                return;
            }
            const res = await axios.post('https://topbikewebsite.onrender.com/resetPassword', {
                email: values.email,
                password: values.password
            })
            res.status === 200 ? toast.success(res.data) : toast.error(res.data);
            resetForm()
            setIsResetFormOpen(false)

        } catch (error) {
            toast.error('User not found, Please enter email Correctly', error.message)
        }
    }

    return (
        <div className='resetPassword'>
            <h1>Reset Password</h1>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .min(6, 'Too Short')
                        .required('Required'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .min(8, 'Must be 8 characters or more')
                        .required('Required'),
                    confirmPassword: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .min(8, 'Must be 8 characters or more')
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    handleResetPassword(values, resetForm)
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form
                >
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" />
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="email" />
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="input">
                        <Field name="password" type={isPasswordOpen ? "text" : "password"} />
                    </div>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="password" />
                    </div>
                    <label htmlFor="confirmPassword">ConfirmPassword</label>
                    <div className="input">
                        <Field name="confirmPassword" type={isPasswordOpen ? "text" : "password"} />
                    </div>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="confirmPassword" />
                    </div>
                    <label htmlFor="" className='label'>
                        <input onChange={() => setIsPasswordOpen(!isPasswordOpen)} className='' type="checkBox" />
                        Show Password
                    </label>
                    <button type="submit">Reset Password</button>
                </Form>
            </Formik>
            <p className='backToLogin' onClick={() => setIsResetFormOpen(false)}>Back to Login</p>

        </div>
    )
}

export default ResetPasswordForm