import express from "express";
import Razorpay from "razorpay";
import cors from "cors"; // To handle CORS if needed
import dotenv from "dotenv";
import QRCode from "qrcode";
import sharp from "sharp";
import Jimp from "jimp";
import fs from "fs";
import Mailjet from "node-mailjet";
import mysql from "mysql2/promise";

dotenv.config();

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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

app.post("/api/create-order/:amount", async (req, res) => {
  try {
    const amt = req.params.amount; //bring the varibale from the url
    const order = await razorpay.orders.create({
      amount: amt * 100, //varibale to be included in place of amount
      currency: "INR",
      receipt: "KCH" + Math.random().toString(36).substring(7),
    });
    res.json({ orderId: order.id, amount: amt }); //include the amount varibale
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  res.status(200).json({ message: "Data received successfully" });
});

const sendTicketMail = (base64String, email = null, name = null) => {
  if (email === null || email=="null") {
    return;
  }

  dotenv.config();
  const pubkey = process.env.VITE_EMAIL_API_KEY;
  const seckey = process.env.VITE_EMAIL_SECRET_KEY;

  const mailjet = Mailjet.apiConnect(pubkey, seckey);

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "ashish.kumar.samantaray2003@gmail.com",
          Name: "Ashish Kumar Samantaray",
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: "SANGRAMITRA Test Email",
        TextPart:
          "Dear users, welcome to the advanced AI based ticketing system",
        HTMLPart:
          "<h3>Welcome to SangrahaMitra</h3><br/>May the museum visit be flawless",
        Attachments: [
          {
            ContentType: "image/png",
            Filename: "ticket_ticketid.png",
            Base64Content: base64String,
          },
        ],
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

const genimage = async function generateTicket(
  ticketid
) {
  const data = {
    Tid: ticketid
  };

  try {
    //Generate QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));

    // Load the ticket template image
    const img2 = await sharp("rsc_tickettemp.png")
      .resize({ height: 400 })
      .toBuffer(); // Adjust height as needed

    // Get metadata of the ticket template image
    const img2Metadata = await sharp(img2).metadata();

    // Step 2:QR code image buffer
    // eslint-disable-next-line no-undef
    const qrBuffer = await sharp(
      Buffer.from(qrCodeDataUrl.split(",")[1], "base64")
    )
      .resize({ width: 400, height: 400 })
      .toBuffer();

    // Get metadata of the QR code image
    const qrMetadata = await sharp(qrBuffer).metadata();

    // Step 3:text image using Jimp
      const [ticketforgen] = await db.execute(
          'SELECT * FROM Ticket WHERE ticket_id= ?',
          [ticketid]
      );

      const dataforticket={
          Name:ticketforgen[0].name,
          museumname:ticketforgen[0].museum_name,
          eventsname:ticketforgen[0].events
      }


      const text = JSON.stringify(dataforticket);//name,museumname,events
    const textImage = await new Jimp(1300, 60, 0xffffffff); // Create a white background
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
        background: { r: 255, g: 255, b: 255 },
      },
    }).composite([
      { input: img2, top: 0, left: 0 },
      { input: qrBuffer, top: 0, left: img2Metadata.width },
      { input: textBuffer, top: img2Metadata.height, left: 0 },
    ]);

    const buf = await finalImage.toBuffer();
    await finalImage.toFile("ticket.png");
    return buf;
  } catch (error) {
    console.error("Error generating ticket:", error.message);
  }
};

app.get("/api/generate-image/:ticketid/:emailid", async (req, res) => {

    const tid=req.params.ticketid;
    const eid=req.params.emailid;

    const buff = await genimage(
    tid
  ).catch((err) => console.error(err));

  const ticketFile = "./ticket.png";

  fs.readFile(ticketFile, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
    } else {
      const base64Data = data.toString("base64");
          sendTicketMail(base64Data, eid, tid);
      res.json({ data: base64Data });
    }

    // Delete the file after sending
    fs.unlink(ticketFile, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
