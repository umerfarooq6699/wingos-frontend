import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import emptyCart from '../assets/Images/empty-cart.webp'
import { clearCart, decrement, increment, orders } from '../../Slices/addtocartSlice'
import { v4 as uuidv4 } from 'uuid';
import { loadStripe } from '@stripe/stripe-js';
import toast, { Toaster } from 'react-hot-toast';
import { emptyCartMsg, emptyNotification, Logged } from '../../Slices/userSlice';
import Navbar from "./Navbar"

const CartButton = () => {
    const { cartArray } = useSelector(state => state.Cart)
    const dispatch = useDispatch()
    const { cartBtnMsg } = useSelector(state => state.User)
    const [token, settoken] = useState()
    const [client, setclient] = useState(JSON.parse(localStorage.getItem("user")) || {})
    // console.log(cartArray, "cartArray")
    const [checkCart, setcheckCart] = useState(false)
    const handleCart = () => {
        setcheckCart(true)
    }
    const handleCross = () => {
        setcheckCart(false)
    }
    const totalPrice = cartArray.reduce((a, b) => {
        return a + Number(b.quantity * b.price)
    }, 0)

    const handleOverlay = (event) => {
        if (event.target.classList.contains("overlay")) {
            setcheckCart(false)
        }
    }

    const totalQuantity = cartArray.reduce((a, b) => {
        return a + b.quantity
    }, 0)

    useEffect(() => {
        settoken(localStorage.getItem("token") || "")
        if (cartBtnMsg?.message) {
            toast.error(cartBtnMsg.message)
        }
    }, [cartBtnMsg])

    const checkout = async () => {
        dispatch(Logged(token))
        setTimeout(() => {
            dispatch(emptyCartMsg())
        }, 2000);
        // const date = new Date()
        // const day = date.getDate()
        // const month = date.getMonth()
        // const year = date.getFullYear()


        // const ordersObject = {
        //     orderId: uuidv4(),
        //     userId: client._id,
        //     quantity: totalQuantity,
        //     price: totalPrice,
        //     time: `${day}-${month}-${year}`
        // }

        // dispatch(orders(ordersObject))


        // const stripe = await loadStripe("pk_test_51PM559G0hXsNMoU5CfIKz2RTXApJ33otkNaNnheIqeKfIzqJ4dnrWhLOoOd0Up9LfMhzbPG665J7uwThSjigWofT004OHJgSGw");

        // const body = {
        //     products: cartArray
        // }
        // const headers = {
        //     "Content-Type": "application/json"
        // }
        // const response = await fetch("https://wingos-server.vercel.app/create-checkout-session", {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(body)
        // });

        // const session = await response.json();

        // const result = stripe.redirectToCheckout({
        //     sessionId: session.id
        // });

        // if (result.error) {
        //     console.log(result.error);
        // }

    }



    return (
        <>
            <div>
                <Toaster />
            </div>
            <div className='w-[100%] h-[60px] flex justify-center items-center shadow-2xl lg:hidden fixed bottom-0 bg-white'>
                <div onClick={handleCart} className='w-[95%] h-[50px] flex justify-center items-center bg-[rgb(244,176,37)] text-white z-20 rounded-xl cursor-pointer'>
                    View Cart
                </div>
            </div>

            <div onClick={handleOverlay} className={`w-full h-screen overlay lg:hidden fixed top-0 transition-all duration-1000 ${checkCart ? "block" : "hidden"} bg-[rgb(0,0,0,0.8)] z-20`}>
                <div className={`w-[100%] md:w-[40%] h-screen absolute transition-all duration-500 ${checkCart ? "left-0" : "-left-[100%]"} bg-white`}>



                    {
                        cartArray && cartArray.length > 0 ?
                        <>
                        <Navbar/>
                                <div className='w-full h-[100vh] shahow-2xl p-3 overflow-y-auto'>
                                    <div className='flex justify-between '>
                                        <h1 className='text-[rgb(33,37,41)] font-[500] text-2xl'>Your Cart</h1>
                                        <div className='flex'>
                                            <button onClick={() => dispatch(clearCart())} className='bg-[rgb(238,213,137)] text-[rgb(215,148,57)] rounded-xl px-2'>Clear Cart</button>
                                            <div onClick={handleCross} className='w-[30px] h-[30px] ml-8 flex justify-center items-center rounded-full cursor-pointer bg-[rgb(238,213,137)]'><i class="fa-solid fa-xmark"></i></div>
                                        </div>
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
                                                                <h1 className='font-[500]'>RS.{e.price * e.quantity}</h1>
                                                                <div className='flex mt-2'>
                                                                    <div onClick={() => dispatch(decrement(e.name))} className='w-[30px] h-[30px] border border-gray-300 flex justify-center items-center text-xl cursor-pointer'>-</div>
                                                                    <div className='w-[30px] h-[30px] flex justify-center items-center border border-gray-300'>{e.quantity}</div>
                                                                    <div onClick={() => dispatch(increment(e.name))} className='w-[30px] h-[30px] border border-gray-300 flex justify-center items-center text-xl cursor-pointer'>+</div>
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
                                        <h1 className=''>RS.{totalPrice}</h1>
                                    </div>

                                    <div className='flex justify-between'>
                                        <h1 className='font-[500]'>Grand Total</h1>
                                        <h1 className='font-[500]'>RS.{totalPrice}</h1>
                                    </div>

                                    <div onClick={checkout} className='bg-[rgb(238,213,137)] text-[rgb(215,148,57)] sticky bottom-3 flex justify-center items-center py-3 mt-3 font-[500] text-xl cursor-pointer'>Checkout</div>

                                </div>
                            </>
                            :
                            <>
                                <div onClick={handleCross} className='absolute right-3 top-3 cursor-pointer text-xl'>
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
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

export default CartButton