"use client";
import './App.css';
import { useState } from "react";
import axios from 'axios';

function Test() {
    const [isProcessing, setIsProcessing] = useState(false);

    const postdata = async (data) => {
        try {
            const response = await axios.post('http://localhost:4000/api/payment-success', data);
            console.log('Ticket inserted successfully:', response.data);
        } catch (error) {
            console.error('Error inserting ticket:', error);
        }
    }

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const urlforpayment = 'http://localhost:4000/api/create-order/99/ASHISH/7852569987/45/4/7/IndianMuseum';
            const response = await fetch(urlforpayment, { method: 'POST' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount * 100,
                currency: "INR",
                name: "MUSEOMATE",
                description: "Test transaction",
                order_id: data.orderId,
                handler: function (response) {
                    const jsonobj = {
                        name: data.name,
                        mobile_no: data.mobileno,
                        noofchildren:data.no_of_children,
                        noofforeigners:data.no_of_foreigners,
                        noofadults:data.no_of_adults,
                        museum_name: data.Museum_name,
                        status:data.status,
                        paymentdetails: response
                    };

                    postdata(jsonobj);
                    console.log(jsonobj);
                },
                prefill: {
                    name: "Ashish",
                    email: "ashish@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            if (window.Razorpay) {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } else {
                throw new Error('Razorpay script not loaded');
            }
        } catch (err) {
            console.error("Payment failed", err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePayment}
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Let's Pay"}
            </button>
        </div>
    );
}

export default Test;