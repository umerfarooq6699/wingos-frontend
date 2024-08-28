import React from 'react'
import Google from "../assets/Images/google.png"
import App from "../assets/Images/app.png"

const Footer = () => {
    return (
        <>
            <div className='w-full h-[40vh] bg-[rgb(19,23,26)] mt-5 flex justify-center items-center px-4'>
                <div className='w-[300px] mt-2'>
                    <div className='md:flex'>
                        <div>
                            <img src={Google} alt="" />
                        </div>
                        <div className='mt-3 md:mt-0'>
                            <img src={App} alt="" />
                        </div>
                    </div>
                    <h1 className='text-white mt-8'>Powered by <span className='md:text-xl md:font-[500]'>Indoji</span> | Privacy Policy | Faqs</h1>
                </div>
            </div>
        </>
    )
}

export default Footer