import React from 'react'


function Downloadticket() {

    const downloadLinkRef = useRef(null);

    const downloadImage = async () => {
        try {
      const response = await fetch("http://localhost:3000/api/generate-image"); // Replace with your server URL
      const data = await response.json();
      const dataURI = `data:image/png;base64,${data.data}`; // Update MIME type for PNG

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = dataURI;
        downloadLinkRef.current.download = "ticket_image.png"; 
        downloadLinkRef.current.click();
        downloadLinkRef.current.href = ""; // Reset href
      }
    } catch (error) {
      console.error("Error downloading the image:", error);
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
            <a ref={downloadLinkRef} style={{ display: "none" }} />

        </div>
    )
}

export default Downloadticket
