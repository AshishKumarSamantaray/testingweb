import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from "mysql2";

dotenv.config();

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


app.post('/api/lodge-issue/:ticketid/:description', async (req, res) => {
    try {
        const tid=req.params.ticketid;
        const desc=req.params.description;

        const [insertResult] = await db.execute(
            'INSERT INTO query (ticketId, description) VALUES (?, ?)',
            [tid, desc]
        );

        const [deleteResult] = await db.execute(
            'DELETE FROM Ticket WHERE ticketId = ?',
            [tid]
        );

        res.json({complainstatus:true})

    } catch (error) {
        console.error('Error in issue ', error);
        res.status(500).json({ error: 'error in raising issue' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
