import React, { useState } from 'react'
import "./index.scss"
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom"

function Form() {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [subject, setSubject] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (!email.trim() || !message.trim() || !subject.trim() || !name.trim()) {
            toast.error("Please fill all form")
            return
        }
        try {
            const serviceId = "service_uct2fj2"
            const templateId = "template_x6x5rnr"
            const publicKey = "rrxLwbavmOR8uj7V8"
            const html = `
            ${message}
            `

            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,   
                to_name: "Ilkin",
                message: html,

            }

            emailjs.send(serviceId, templateId, templateParams, publicKey).then((response) => {
                setEmail('')
                setName('')
                setMessage('')
                setSubject('')
            })
            toast.success("Email Sent Successfully")
        } catch (error) {
            toast.error('Oops! there was an error')
        }

    }



    return (
        <div className='contact-form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='Your Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                <textarea type="text " cols={'80'} rows={'20'} placeholder='Your message' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit'>SEND TO US</button>

            </form>
        </div>
    )
}


export default Form





