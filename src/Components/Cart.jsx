import React, { useEffect, useState } from 'react'
import emptyCart from '../assets/Images/empty-cart.webp'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decrement, increment, orders } from '../../Slices/addtocartSlice'
import { v4 as uuidv4 } from 'uuid';
import { loadStripe } from '@stripe/stripe-js';
import { emptyCartMsg, emptyNotification, Logged } from '../../Slices/userSlice';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
    const { cartArray } = useSelector(state => state.Cart)
    const [token, settoken] = useState()
    const [client, setclient] = useState(JSON.parse(localStorage.getItem("user")) || {})
    const dispatch = useDispatch()
    const { cartMsg } = useSelector(state => state.User)
    // console.log(cartArray, "cartArray")

    const totalPrice = cartArray.reduce((a, b) => {
        return a + Number(b.quantity * b.price)
    }, 0)

    const totalQuantity = cartArray.reduce((a, b) => {
        return a + b.quantity
    }, 0)

    useEffect(() => {
        settoken(localStorage.getItem("token") || "")
        if (cartMsg?.message) {
            toast.error(cartMsg.message)
        }
    }, [cartMsg])

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

    console.log(token, "cart token")
    return (
        <>
            <div><Toaster /></div>
            <div className='w-full sticky top-0 bg-white shadow-2xl'>

                {
                    cartArray && cartArray.length > 0 ?
                        <>
                            <div className='w-full h-[100vh] shahow-2xl p-3 overflow-y-auto'>
                                <div className='flex justify-between '>
                                    <h1 className='text-[rgb(33,37,41)] font-[500] text-2xl'>Your Cart</h1>
                                    <button onClick={() => dispatch(clearCart())} className='bg-[rgb(238,213,137)] text-[rgb(215,148,57)] rounded-xl px-2'>Clear Cart</button>
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
                                                                <div onClick={() => dispatch(decrement(e.name))} className='w-[30px] h-[30px] flex justify-center items-center text-xl cursor-pointer border border-gray-500'>-</div>
                                                                <div className='w-[30px] h-[30px] flex justify-center items-center border border-gray-500'>{e.quantity}</div>
                                                                <div onClick={() => dispatch(increment(e.name))} className='w-[30px] h-[30px] flex justify-center items-center text-xl cursor-pointer border border-gray-500'>+</div>
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
                                    <h1 className=''>RS. {totalPrice}</h1>
                                </div>

                                <div className='flex justify-between'>
                                    <h1 className='font-[500]'>Grand Total</h1>
                                    <h1 className='font-[500]'>RS. {totalPrice}</h1>
                                </div>

                                <div onClick={checkout} className='bg-[rgb(238,213,137)] text-[rgb(215,148,57)] sticky bottom-3 flex justify-center items-center py-3 mt-3 font-[500] text-xl cursor-pointer'>Checkout</div>

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
        </>
    )
}

export default Cart