import sharp from 'sharp';
import QRCode from 'qrcode';
import Jimp from 'jimp';

// Function to generate the ticket
async function generateTicket(name, ticketid, noa, noc, nof, events, museumname, status) {
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
        const img2 = await sharp('rsc_tickettemp.png').resize({ height: 400 }).toBuffer(); // Adjust height as needed

        // Get metadata of the ticket template image
        const img2Metadata = await sharp(img2).metadata();

        // Step 2:QR code image buffer
        // eslint-disable-next-line no-undef
        const qrBuffer = await sharp(Buffer.from(qrCodeDataUrl.split(',')[1], 'base64')).resize({ width: 400, height: 400 }).toBuffer();

        // Get metadata of the QR code image
        const qrMetadata = await sharp(qrBuffer).metadata();

        // Step 3:text image using Jimp
        const text = JSON.stringify(data);
        const textImage = await new Jimp(1300, 60, 0xFFFFFFFF); // Create a white background
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
        await finalImage.toFile('ticketID_replace2.png');

    } catch (error) {
        console.error('Error generating ticket:', error.message);
    }
}

// Call the function
generateTicket("ashish","hgfh789056",2,3,5,["event1","longevent2","verylongevent3"],"Regionalmuseumofnationalhistory","allowed").catch(err => console.error(err));