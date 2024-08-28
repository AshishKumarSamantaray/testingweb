import React from 'react'


function Downloadticket() {

    const downloadImage = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/generate-image'); // Replace with your server URL
            const data = await response.json();
            const blob = data.blob;
            //
            const url = window.URL.createObjectURL(blob);
            console.log(url)

            // const link = document.createElement('a');
            // link.href = url;
            // link.download = 'downloaded-image.jpg';
            // document.body.appendChild(link);
            // link.click();
            //
            // document.body.removeChild(link);
            // window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                color="success"
                onClick={downloadImage}
            >
                Download
            </button>

        </div>
    )
}

export default Downloadticket
