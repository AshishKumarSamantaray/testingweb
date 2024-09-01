import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

app.post('/back-fetch/:museumid', async (req, res) => {
    try {

        const url=req.body.url;
        // const museumID=req.params.museumid;//call filteration database
        // const [m1] =db.execute(
        //     'SELECT * FROM museum WHERE museum_id = ?',
        //     [museumID]
        // );

        // const mdata={ // statecode:m1[0].state_code;
        //     // city :m1[0].city;
        //     // mname:m1[0].museum_name;
        //     //}

        const mdata={
            statecode:"OR",
            city:"Bhubaeswar",
            mname:"Indian Museum"
        }

        res.json({
            urlforfrontend: `${url}/home/museum?state=${mdata.statecode}&city=${mdata.city}&museum=${encodeURIComponent(mdata.mname)}`
        });


    } catch (error) {
        console.error('Error in direct fetch ', error);
        res.status(500).json({ error: 'error in frontend fetch' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});