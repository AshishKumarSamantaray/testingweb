import React from 'react'
// import {generateTicket} from "./ticketdownload/ticketing.js";

function Downloadticket() {

    // const image=generateTicket("ashish","hgfh789056",2,3,5,["event1","longevent2","verylongevent3"],"Regionalmuseumofnationalhistory","allowed").catch(err => console.error(err));
    //
    // const downloadImage = async () => {
    //     try {
    //         // Assuming `finalImage` is a URL or Blob representing your image
    //         const finalImage = image.toFile; // Replace with your image URL or Blob
    //
    //         // If finalImage is a URL, fetch the image and convert it to a Blob
    //         const response = await fetch(finalImage);
    //         const blob = await response.blob();
    //
    //         // Create a URL for the Blob
    //         const url = window.URL.createObjectURL(blob);
    //
    //         // Create an anchor element and trigger a download
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'downloaded-image.jpg'; // The name of the downloaded file
    //         document.body.appendChild(link);
    //         link.click();
    //
    //         // Clean up
    //         document.body.removeChild(link);
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         console.error('Error downloading the image:', error);
    //     }
    // };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                color="success"
                // onClick={downloadImage}
            >
                Download
            </button>

        </div>
    )
}

export default Downloadticket
