import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID,
    key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
});

// MySQL database connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/api/create-order/:amount', async (req, res) => {
    try {
        const amt = req.params.amount;
        const order = await razorpay.orders.create({
            amount: amt * 100,
            currency: 'INR',
            receipt: 'KCH' + Math.random().toString(36).substring(7),
        });
        res.json({ orderId: order.id, amount: amt });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.post('/api/payment-success', async (req, res) => {
    try {
        const { ticket_id, name, museum_name, paymentdetails } = req.body;

        const [result] = await db.execute(
            'INSERT INTO Ticket (ticket_id, name, museum_name, status) VALUES (?, ?, ?, ?)',
            [ticket_id, name, museum_name, 'allowed']
        );

        res.status(200).json({ message: 'Ticket inserted successfully' });
    } catch (error) {
        console.error('Error inserting ticket:', error);
        res.status(500).json({ error: 'Error inserting ticket' });
    }
});

app.post('/api/data', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.status(200).json({ message: 'Data received successfully' });
});

app.listen(port, () => {
    console.log("Server is running on http://localhost:4000");
});