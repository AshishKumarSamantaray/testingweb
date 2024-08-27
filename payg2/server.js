import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors'; // To handle CORS if needed
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.VITE_PORT || 3000;

app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID, // Use process.env to get Razorpay credentials
    key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});

app.post('/api/create-order', async (req, res) => {
//varibale inside path
    try {
        const amt=500//bring the varibale from the url
        const order = await razorpay.orders.create({
            amount: amt * 100, //varibale to be included in place of amount
            currency: 'INR',
            receipt: 'KCH' + Math.random().toString(36).substring(7),
        });
        res.json({ orderId: order.id,
        amount:amt});//include the amount varibale
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});