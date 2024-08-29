import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

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


app.post('/api/create-event-order/:amount/:ticketid/:eventname', async (req, res) => {
    try {
        const amtevent = req.params.amount;
        const tid = req.params.ticketid;
        const eventn = req.params.eventname;

        const [seeStatus] = await db.execute(
            'SELECT status FROM Ticket WHERE ticket_id = ?',
            [tid]
        );

        if (seeStatus[0].status !== "allowed") {
            throw new Error('Status is not allowed');
        }

        const order2 = await razorpay.orders.create({
            amount: amtevent * 100,
            currency: 'INR',
            receipt: 'KCH' + Math.random().toString(36).substring(7),
        });

        res.json({
            orderId: order2.id,
            amount: amtevent,
            ticketid: tid,
            eventname: eventn
        });

    } catch (e) {
        console.error('Error creating event order:', e);
        res.status(500).json({ error: 'Error creating order' });
    }
});


app.post('/api/payment-success-event', async (req, res) => {
    try {
        const { Ticket_id, event_name } = req.body;

        const [updateResult] = await db.execute(
            'UPDATE Ticket SET events = ? WHERE ticket_id = ?',
            [event_name, Ticket_id]
        );

        res.status(200).json({ ticket_id: Ticket_id, eventname: event_name });
    } catch (error) {
        console.error('Error inserting ticket:', error);
        res.status(500).json({ error: 'Error inserting ticket' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
