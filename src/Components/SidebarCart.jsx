import React from 'react'
import emptyCart from '../assets/Images/empty-cart.webp'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decrement, increment } from '../../Slices/addtocartSlice'

const SidebarCart = () => {
    const { cartArray } = useSelector(state => state.Cart)
    const dispatch = useDispatch()
    console.log(cartArray, "cartArray")
    const removeCart=()=>{
        console.log("working")
    }
    return (
        <>

            <div className='w-[100%] px-0 h-screen fixed top-0 z-10 bg-red-200'>
                <div className='w-[100%] absolute -left-[100%] h-screen bg-white shadow-2xl border border-blue-500'>

                    {
                        cartArray && cartArray.length > 0 ?
                            <>
                                <div className='w-full h-[100vh] shahow-2xl p-3 border border-blue-500 overflow-y-auto'>
                                    <div className='flex justify-between '>
                                        <h1  className='text-[rgb(33,37,41)] font-[500] text-2xl'>Your Cart</h1>
                                        <button onClick={removeCart} className='bg-[rgb(238,213,137)] text-[rgb(215,148,57)] rounded-xl px-2'>Clear Cart</button>
                                    </div>

                                    <div className='mt-7'>
                                        {
                                            cartArray && cartArray.length > 0 && cartArray.map((e, i) => {
                                                return (
                                                    <>
                                                        <div className='flex justify-between mt-5'>

                                                            <div className='flex items-center'>
                                                                <div className='w-[70px] rounded'>
                                                                    <img src={e.path} className='w-full rounded' alt="" />
                                                                </div>
                                                                <h1 className='ml-3 text-xl font-[500]'>{e.name}</h1>
                                                            </div>

                                                            <div className='flex flex-col items-end'>
                                                                <h1 className='font-[500]'>RS.{e.price}</h1>
                                                                <div className='flex mt-2'>
                                                                    <div onClick={() => dispatch(decrement(e.name))} className='w-[30px] h-[30px] flex justify-center items-center text-xl cursor-pointer'>-</div>
                                                                    <div className='w-[30px] h-[30px] flex justify-center items-center'>{e.quantity}</div>
                                                                    <div onClick={() => dispatch(increment(e.name))} className='w-[30px] h-[30px] flex justify-center items-center text-xl cursor-pointer'>+</div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='flex justify-between mt-5'>
                                        <h1>Total</h1>
                                        <h1 className=''>RS.jlkjlkj</h1>
                                    </div>

                                    <div className='flex justify-between'>
                                        <h1 className='font-[500]'>Grand Total</h1>
                                        <h1 className='font-[500]'>RS.</h1>
                                    </div>

                                    <div className='bg-[rgb(238,213,137)] text-[rgb(215,148,57)] sticky bottom-3 flex justify-center items-center py-3 mt-3 font-[500] text-xl cursor-pointer'>Checkout</div>

                                </div>
                            </>
                            :
                            <>
                                <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
                                    <div className='w-[70%]'>
                                        <img src={emptyCart} className='w-full' alt="" />
                                    </div>
                                    <h1 className='text-[rgb(253,209,77)] font-[500]'>Your cart is empty</h1>
                                    <h1 className='text-[rgb(142,142,142)]'>Add items to get started</h1>
                                </div>
                            </>
                    }





                </div>
            </div>

        </>
    )
}

export default SidebarCart