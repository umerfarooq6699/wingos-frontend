import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addtocart } from '../../Slices/addtocartSlice'

const Popup = ({ singleObject, setpopupObj }) => {
    const [object, setobject] = useState(singleObject)
    const dispatch = useDispatch()
    const [qnty, setqnty] = useState(1)
    const sizeArray = ["S", "M", "L"]
    const [size, setsize] = useState("M")

    const handleRemove = () => {
        setpopupObj("")
    }

    const decrement = () => {
        if (qnty === 1) {
            setqnty(1)
        } else {
            setqnty(qnty - 1)
        }
    }

    const increment = () => {
        setqnty(qnty + 1)
    }

    const inputValue = (e) => {
        setqnty(e.target.value)
    }

    const handleOverlay = (event) => {
        if (event.target.classList.contains("overlay")) {
            setpopupObj("")
        }
    }

    useEffect(() => {
        setobject({ ...object, quantity: qnty, size: size })
    }, [qnty, size])

    useEffect(() => {
        // Disable scroll on body when popup is open
        document.body.style.overflow = 'hidden';

        // Enable scroll when popup is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleCart = () => {
        dispatch(addtocart(object))
        setpopupObj("")
    }

    console.log(object, "object")

    return (
        <>

            <div onClick={handleOverlay} className='w-full h-screen overlay cursor-crosshair flex justify-center items-center z-[10] bg-[rgba(0,0,0,0.56)] fixed top-0 left-0'>
                <div className='w-[90%] md:w-[60%] lg:w-[65%] h-[80vh] bg-white relative rounded-xl p-2 cursor-auto'>
                    <div className='flex justify-between items-center px-6'>
                        <h1 className='text-xl font-[500]'>Wingos</h1>
                        <div onClick={handleRemove} className='cursor-pointer text-3xl'>&times;</div>
                    </div>

                    <div className='w-full h-[70vh] lg:h-[70vh] grid grid-cols-1 lg:grid-cols-2 overflow-y-auto mt-2'>

                        <div className='w-full flex justify-center items-center'>
                            <div className='w-[100%] lg:w-[90%]'>
                                <img src={singleObject.path} className='w-full' alt="" />
                            </div>
                        </div>

                        <div className='w-full border-l-2 border-gray-300 px-2 py-3 lg:px-6'>
                            <div className='w-full lg:mt-[64px]'>
                                <h1 className='text-[rgb(17,24,39)] text-2xl font-[600]'>{object.name}</h1>
                                <h1 className='text-gray-600 font-[600] text-xl mt-3'>Rs. {object.price}</h1>
                                <h1 className='text-[rgb(17,24,39)] font-[500] text-xl mt-5'>Size</h1>

                                <div className='flex mt-2'>
                                    {sizeArray.map((e, i) => {
                                        return (
                                            <>
                                                <div onClick={() => setsize(e)} className={`border border-gray-400 cursor-pointer font-[500] ${i !== 0 ? "ml-3" : ""}  ${e == size ? "bg-[rgb(79,70,229)] text-white" : ""} rounded-xl px-3 py-2  md:px-4 md:py-2`}>
                                                    {e}
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                                <h1 className='mt-3 font-[500] text-xl'>Quantity</h1>

                                <div className='flex mt-3'>
                                    <div onClick={decrement} className='w-[43px] h-[40px] text-xl flex justify-center items-center border border-gray-400 cursor-pointer rounded'>-</div>
                                    <input onChange={inputValue} type="text" value={qnty} className='w-[50px] h-[40 px] text-center border border-gray-400' />
                                    <div onClick={increment} className='w-[43px] h-[40px] text-xl flex justify-center items-center border border-gray-400 cursor-pointer rounded'>+</div>
                                </div>

                                <button onClick={handleCart} className='bg-[rgb(79,70,229)] text-white w-full rounded py-2 mt-6'>Add to cart</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Popup