import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

app.post('/api/direct-museum-fetch/:museumid', async (req, res) => {
    try {
       const museumID=req.params.museumid;
       res.json({museum_name:museumID})
    } catch (error) {
        console.error('Error in museum fetch ', error);
        res.status(500).json({ error: 'error in museum fetch' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
