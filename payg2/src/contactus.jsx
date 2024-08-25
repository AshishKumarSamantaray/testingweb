import contactHeader from "../src/assets/contactheader.png"

function Contactus() {
    return (
        <div className='h-screen w-screen'>
            <div className='w-full h-[50%] bg-amber-500 bg-cover bg-center'
                 style={{backgroundImage: `url(${contactHeader})`}}>
            </div>
            <div className='w-full h-[50%] bg-red-600'>

            </div>
        </div>
    )
}

export default Contactus
