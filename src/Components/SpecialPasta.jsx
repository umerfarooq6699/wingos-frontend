import React, { useEffect, useRef, useState } from 'react'
import chickenImage from '../assets/Images/specialpasta.png'
import { useDispatch, useSelector } from 'react-redux'
import Popup from './Popup'
import { specialPasta } from '../../Slices/addtocartSlice'
import ReactLoading from "react-loading"

const SpecialPasta = () => {
    const pasta = useRef()
    const dispatch = useDispatch()
    const [popupObj, setpopupObj] = useState("")
    const { loading, notification } = useSelector(state => state.Dashboard)
    // console.log(notification, "productsArray")
    const productsArray = notification?.data?.array
    // console.log(productsArray, "productsArray")

    const handleView = (object) => {
        setpopupObj(object)
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            dispatch(specialPasta(pasta.current.getBoundingClientRect().top))
        })
    })

    return (
        <>
            <div id="pasta" ref={pasta} className='mt-[50px]'>
                <div className='w-full'>
                    <img src={chickenImage} alt="" />
                </div>

                {
                    loading ?
                        <div className='w-4/4 h-[80px] md:h-[160px] lg:h-[210px] mt-5 bg-[rgb(235,235,235)] flex justify-center items-center'>
                            <div className='w-auto'>
                                <ReactLoading type="spokes" color="text-white" height={50} width={50} />
                            </div>
                        </div>
                        :


                        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {
                                productsArray && productsArray.length > 0 &&
                                productsArray.map((e, i) => {
                                    return (
                                        <>
                                            {
                                                e.category === "special pasta" &&
                                                <>

                                                    <div onClick={() => handleView(e)} className='flex rounded-2xl cursor-pointer shadow-xl p-3 border border-blue-50 bg-white'>

                                                        <div className='w-[90px] rounded-2xl'>
                                                            <img className='w-full rounded-2xl' src={e.path} alt="" />
                                                        </div>

                                                        <div className='ml-3'>
                                                            <h1 className='text-[rgb(33,37,69)] font-[700] text-xl'>{e.name}</h1>
                                                            <div className='w-max bg-[rgb(250,112,0)] text-white font-[500] px-1 mt-1'>RS. {e.price}</div>
                                                            <div className='w-[24px] flex justify-center items-center mt-1 bg-[rgb(238,213,137)] text-xl rounded-[4px] text-[rgb(217,148,54)]'>+</div>
                                                        </div>

                                                    </div>

                                                </>
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                }
            </div>

            {popupObj && <Popup singleObject={popupObj} setpopupObj={setpopupObj} />}
        </>
    )
}

export default SpecialPasta