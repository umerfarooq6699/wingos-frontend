import React, { useState } from 'react'
import Sidebar from './Sidebar'

const DashboardNavbar = () => {
    const [sidebar,setsidebar]=useState(false)

    const handleSidebar=()=>{
        if(!sidebar){
            setsidebar(true)
        }else{
            setsidebar(false)
        }
    }

    const handleOverlay=(event)=>{
        if(event.target.classList.contains("overlay")){
            setsidebar(false)
        }
    }

    return (
        <>
            <div className='w-full h-[56px] px-5 bg-[rgb(244,176,37)] flex justify-between items-center'>
                <div onClick={handleSidebar} className='lg:hidden text-white'>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <h1 className='text-white font-[500] lg:text-xl'>Admin</h1>
                <h1 className='text-white font-[500] text-xl hidden lg:block'>Wingos</h1>
            </div>

            <div onClick={handleOverlay} className={`w-full h-full overlay lg:hidden bg-[rgba(0,0,0,0.55)] fixed ${sidebar ? "block" : "hidden"} z-10`}>
                <div className={`w-[60%] md:w-[30%] ${sidebar ? "left-0" : "sm:-left-[60%] md:-left-[30%]"} absolute top-0`}>
                    <Sidebar />
                </div>
            </div>

        </>
    )
}

export default DashboardNavbar