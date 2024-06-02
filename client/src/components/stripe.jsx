import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import StripeCheckout from 'react-stripe-checkout';
import { userContext } from '../context/userContext';
import "./stripe.scss"
import emailjs from '@emailjs/browser';


function Stripe() {
    const { basketArr, RevenueArray, setBasketArr, user, fetchBasketData } = useContext(userContext);


    const totalPrice = basketArr && basketArr.reduce((acc, curVal) => acc + Number(curVal.product.newPrice * curVal.count), 0);





    const publishableKey =
        'pk_test_51OldjPC2rETq4J308HSM5u1YLYWo6bRLWdDBHZctYBJN5V0CzGBFSDjavB3b5nFUlJmoz330XtWcfWtxW1dmJBG000idjkiPSS';
    const handleSuccess = async () => {
        RevenueArray.push(totalPrice)
        localStorage.setItem("revenue", JSON.stringify(RevenueArray));
        try {
            const serviceId = "service_uct2fj2"
            const templateId = "template_x6x5rnr"
            const publicKey = "rrxLwbavmOR8uj7V8"
            const html = `
                ${user.email} paid  for his order!
                His total price is $${totalPrice}.00
                `
            const templateParams = {
                from_email: user.email,
                subject: 'Payment',
                to_name: "Ilkin",
                message: html,
            }
            emailjs.send(serviceId, templateId, templateParams, publicKey).then(
                toast.success('Paymant successfull')
            )
            await axios.delete(`https://topbikewebsite.onrender.com/users/${user._id}/deleteAllBasket`)
            fetchBasketData()
        } catch (error) {
            toast.error(error.message)
        }
    };
    const handleFailure = () => {
        toast.error('Error')
    };
    const payNow = async token => {
        try {
            const response = await axios({
                url: 'https://topbikewebsite.onrender.com/payment',
                method: 'post',
                data: {
                    amount: (totalPrice * 100),
                    token,
                },
            });
            if (response.status === 200) {
                handleSuccess();
            }
        } catch (error) {
            handleFailure();
            console.log(error);
        }
    };

    return (
        <div className="container">

            <StripeCheckout
                stripeKey={publishableKey}
                label="Pay Now"
                name="Pay With Credit Card"
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                description={`Your total is $${totalPrice}`}
                token={payNow}
            />
        </div>
    );
}

export default Stripe;
