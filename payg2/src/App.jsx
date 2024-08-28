"use client";
import './App.css';
import { useState } from "react";
import axios from 'axios';


function App() {
    const [isProcessing, setIsProcessing] = useState(false);

    const postdata = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/api/data', data);
            console.log('Data posted successfully:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }


    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // Fetch the order from your Express server
            const urlforpayment ='http://localhost:3000/api/create-order/99'
            const response = await fetch(urlforpayment, { method: 'POST' });//variable to be inclued int he post url of the server side as well and thr frontend as well
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Correct prefix for Vite
                amount: data.amount*100,
                currency: "INR",
                name: "MUSEOMATE",
                description: "Test transaction",
                order_id: data.orderId, // Ensure this matches the API response key
                handler: function (response) {
                   const jsonobj={
                       // name:"ashish",
                       // ticket:"inhdjala",
                       ticket_id:"some random unique code",
                       paymentstatus:true,
                       paymentdetails:response
                   }

                   postdata(jsonobj)
                   console.log(jsonobj)
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
            const jsonobj={
                paymentstatus:false,
            }
            postdata(jsonobj)
            console.log(jsonobj)

        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            {/* Make sure the script tag is correctly placed in your HTML or dynamically loaded */}
            {/* It's generally better to include external scripts in the public/index.html */}
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePayment}
                color="success"
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Let's Pay"}
            </button>

        </div>
    );
}

export default App;
