import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';

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
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/api/create-order/:amount/:name/:number/:noc/:nof/:noa/:museum_name/:date', async (req, res) => {
    try {
        const amt = req.params.amount;
        const nme = req.params.name;
        const mobno = req.params.number;
        const no_of_child = req.params.noc;
        const no_of_for = req.params.nof;
        const no_of_ad = req.params.noa;
        const museum_name = req.params.museum_name;
        const date = req.params.date;

        const order = await razorpay.orders.create({
            amount: amt * 100,
            currency: 'INR',
            receipt: 'KCH' + Math.random().toString(36).substring(7),
        });

        res.json({
            orderId: order.id,
            amount: amt,
            name: nme,
            mobile_number: mobno,
            no_of_children: no_of_child,
            no_of_adults: no_of_ad,
            no_of_foreigners: no_of_for,
            museum_name: museum_name,
            status: "allowed",
            date: date
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
});


app.post('/api/payment-success', async (req, res) => {
    try {
        const { name, mobile_no, noofchildren, noofforeigners, noofadults, museum_name, status , date } = req.body;
        console.log(req.body)

        // Insert the ticket into the database
        const [result] =db.execute(
            'INSERT INTO Ticket (name, phone_number, no_of_adults, no_of_children, no_of_foreigners, museum_name, status, purchase_date) VALUES (?, ?, ?, ?, ?, ?, ? ,?)',
            [name, mobile_no, noofchildren, noofforeigners, noofadults, museum_name, status, date]
        );

        // Fetch the ticket_id of the newly inserted record
        const [selectResult] =db.execute(
            'SELECT ticket_id FROM Ticket WHERE name = ? AND phone_number = ? AND no_of_adults = ? AND no_of_children = ? AND no_of_foreigners = ? AND museum_name = ? AND status = ? AND purchase_date = ?',
            [name, mobile_no, noofchildren, noofforeigners, noofadults, museum_name, status, date]
        );

        const fetchedTicketId = selectResult[0].ticket_id;

        res.status(200).json({ ticket_id: fetchedTicketId });
    } catch (error) {
        console.error('Error inserting ticket:', error);
        res.status(500).json({ error: 'Error inserting ticket' });
    }
});


// app.post('/api/data', (req, res) => {
//     const data = req.body;
//     console.log('Received data:', data);
//     res.status(200).json({ message: 'Data received successfully' });
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
