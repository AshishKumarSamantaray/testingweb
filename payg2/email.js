import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';
import fs from 'fs';

function imageToBase64(imagePath)
{
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    return base64String;
}

// Example usage
// eslint-disable-next-line no-undef
const imagepath="C:\\Users\\ASHISH\\WebstormProjects\\testingweb\\payg2\\src\\ticketdownload\\ticketID_replace2.png" //insert the file path here and get the email ready
const base64String = imageToBase64(imagepath);
dotenv.config();
const pubkey=process.env.VITE_EMAIL_API_KEY
const seckey=process.env.VITE_EMAIL_SECRET_KEY

// console.log(pubkey)
// console.log(seckey)
const mailjet = Mailjet.apiConnect(
    pubkey,
    seckey
);

const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
        "Messages": [
            {
                "From": {
                    "Email": "ashish.kumar.samantaray2003@gmail.com",
                    "Name": "Ashish Kumar Samantaray"
                },
                "To": [
                    {
                        "Email": "satwik.k.2000@gmail.com",
                        "Name": "satwik"
                    }
                ],
                "Subject": "SANGRAMITRA Test Email",
                "TextPart": "Dear users, welcome to the advanced AI based ticketing system",
                "HTMLPart": "<h3>Welcome to SangrahaMitra</h3><br/>May the museum visit be flawless",
                "Attachments": [
                    {
                        "ContentType": "image/png",
                        "Filename": "ticket_ticketid.png",
                        "Base64Content": base64String
                    }
                ]
            },
            {
                "From": {
                    "Email": "ashish.kumar.samantaray2003@gmail.com",
                    "Name": "Ashish Kumar Samantaray"
                },
                "To": [
                    {
                        "Email": "sahildash386@gmail.com",
                        "Name": "sahil"
                    }
                ],
                "Subject": "SANGRAMITRA Test Email",
                "TextPart": "Dear users, welcome to the advanced AI based ticketing system",
                "HTMLPart": "<h3>Welcome to SangrahaMitra</h3><br/>May the museum visit be flawless",
                "Attachments": [
                    {
                        "ContentType": "image/png",
                        "Filename": "ticket_ticketid.png",
                        "Base64Content": base64String
                    }
                ]
            }
            ,{
                "From": {
                    "Email": "ashish.kumar.samantaray2003@gmail.com",
                    "Name": "Ashish Kumar Samantaray"
                },
                "To": [
                    {
                        "Email": "ashuspubg@gmail.com",
                        "Name": "ashish"
                    }
                ],
                "Subject": "SANGRAMITRA Test Email",
                "TextPart": "Dear users, welcome to the advanced AI based ticketing system",
                "HTMLPart": "<h3>Welcome to SangrahaMitra</h3><br/>May the museum visit be flawless",
                "Attachments": [
                    {
                        "ContentType": "image/png",
                        "Filename": "ticket_ticketid.png",
                        "Base64Content": base64String
                    }
                ]
            }
        ]
    });

request
    .then((result) => {
        console.log(result.body);
    })
    .catch((err) => {
        console.log(err.statusCode);
    });