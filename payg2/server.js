import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors'; // To handle CORS if needed
import dotenv from 'dotenv';
import QRCode from "qrcode";
import sharp from "sharp";
import Jimp from "jimp";
import {generateTicket} from "./src/ticketdownload/ticket3.js";

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

app.post('/api/create-order/:amount', async (req, res) => {

    try {
        const amt=req.params.amount//bring the varibale from the url
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

app.post('/api/data', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.status(200).json({ message: 'Data received successfully' });
});

const genimage=async function generateTicket(name, ticketid, noa, noc, nof, events, museumname, status) {
    const data = {
        name: name,
        Tid:ticketid,
        children:noc,
        adults:noa,
        foreigners:nof,
        status: status,
        Museum:museumname
    };

    try {
        //Generate QR Code
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));

        // Load the ticket template image
        const img2 = await sharp('rsc_tickettemp.png').resize({ height: 200 }).toBuffer(); // Adjust height as needed

        // Get metadata of the ticket template image
        const img2Metadata = await sharp(img2).metadata();

        // Step 2:QR code image buffer
        // eslint-disable-next-line no-undef
        const qrBuffer = await sharp(Buffer.from(qrCodeDataUrl.split(',')[1], 'base64')).resize({ width: 200, height: 200 }).toBuffer();

        // Get metadata of the QR code image
        const qrMetadata = await sharp(qrBuffer).metadata();

        // Step 3:text image using Jimp
        const text = JSON.stringify(data);
        const textImage = await new Jimp(500, 60, 0xFFFFFFFF); // Create a white background
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK); // Load a font
        textImage.print(font, 10, 10, text); // Print text on the image

        //text image to buffer
        const textBuffer = await textImage.getBufferAsync(Jimp.MIME_PNG);

        // Get metadata of the text image
        const textMetadata = await sharp(textBuffer).metadata();

        // Step 4: Combine images
        const finalImage = await sharp({
            create: {
                width: img2Metadata.width + qrMetadata.width,
                height: img2Metadata.height + textMetadata.height,
                channels: 3,
                background: { r: 255, g: 255, b: 255 }
            }
        })
            .composite([
                { input: img2, top: 0, left: 0 },
                { input: qrBuffer, top: 0, left: img2Metadata.width },
                { input: textBuffer, top: img2Metadata.height, left: 0 }
            ])

        const buf=await finalImage.toBuffer()
        return buf


        // await finalImage.toFile('ticketID_replace2.png');
        //
        // // Convert the final image buffer to a base64 data URL
        // let finalImageDataUrl = `data:image/png;base64,${buf.toString('base64')}`;
        //
        // console.log(finalImageDataUrl)

    } catch (error) {
        console.error('Error generating ticket:', error.message);
    }
}

app.get('/api/generate-image', async (req, res) =>{
    const buffsend=await genimage("sahil", "hgfh789056", 2, 3, 5, ["event1", "longevent2", "verylongevent3"], "Regionalmuseumofnationalhistory", "allowed")
        .catch(err => console.error(err));
    console.log(buffsend)
    res.json({blob:buffsend})
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

