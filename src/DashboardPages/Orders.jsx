import React, { useEffect, useState } from 'react'
import Sidebar from "../DashboardPages/Sidebar"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, orderPage, removeOrder } from '../../Slices/adminSlice'
import Navbar from '../Components/Navbar'
import DashboardNavbar from './DashboardNavbar'
import toast, { Toaster } from 'react-hot-toast'

const Orders = () => {
    const [array, setarray] = useState([])
    const { notification } = useSelector(state => state.Dashboard)
    const [User,setUser]=useState(JSON.parse(localStorage.getItem("user")) || "")
    const dispatch = useDispatch()
    const [startIndex, setstartIndex] = useState(0)
    const [perPage, setperPage] = useState(5)
    const [pageNumber, setpageNumber] = useState(1)
    const navigate=useNavigate()


    useEffect(() => {
        dispatch(orderPage(3))
        dispatch(getOrders())
        if(User){
            if(User.role === "user"){
                navigate("/")
            }
        }
    }, [])


    useEffect(() => {
        if(notification?.data?.array){
            setarray(notification.data.array.slice(startIndex, startIndex + 5))
        }
    }, [notification, startIndex])

    const handleOrder=(id)=>{
        dispatch(removeOrder(id))
        toast.success(notification.message)
    }

    const previous = () => {
        if (startIndex === 0) {
            setstartIndex(0)
        } else {
            setstartIndex(startIndex - 5)
            setpageNumber(pageNumber - 1)
        }
    }

    const next = () => {
        const maxPage = Math.ceil(notification?.data?.array.length / perPage)
        console.log(maxPage, "number")
        if (pageNumber < maxPage) {
            setstartIndex(startIndex + 5)
            setpageNumber(pageNumber + 1)
        }
    }

    const first = () => {
        setstartIndex(0)
        setpageNumber(1)
    }

    const last = () => {
        const maxPage = Math.ceil(notification?.data?.array.length / perPage)
        setpageNumber(maxPage)
        setstartIndex(maxPage * 5 - 5)
    }


    console.log(notification,"notification orders")
    console.log(array,"array orders ")

    return (
        <>
        <div>
            <Toaster/>
        </div>
            <div className='w-full h-screen'>
                <DashboardNavbar />
                <div className='w-full h-[91vh] grid grid-cols-5'>

                    <div className='border border-blue-500 hidden lg:block'>
                        <Sidebar />
                    </div>

                    <div className='col-span-5 lg:col-span-4 border border-red-500 bg-gray-200 p-3 overflow-y-scroll'>

                        <div className='flex justify-between'>
                            <h1 className='font-[600] text-xl'>Orders</h1>
                        </div>



                        {
                            array && array.length > 0 ?

                                <div class="relative shadow-md sm:rounded-lg mt-5">

                                    <div className='overflow-x-auto'>
                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">


                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                                        OrderId
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-nowrap">
                                                        UserId
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Date
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Total Quantity
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Total Price
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                                {

                                                    array.map((e, i) => {
                                                        return (
                                                            <>
                                                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                                        {e.orderId}
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                                        ${e.userId}
                                                                    </td>
                                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                                        {e.time}
                                                                    </td>
                                                                    <td class="px-6 py-4">
                                                                        {e.quantity}
                                                                    </td>
                                                                    <td class="px-6 py-4">
                                                                        {e.price}
                                                                    </td>
                                                                    <td class="px-6 py-4">
                                                                        {/* <i class="cursor-pointer text-green-500 fa-solid fa-eye"></i> */}
                                                                        <i onClick={() => handleOrder(e._id)} class="cursor-pointer text-red-500 ml-3 fa-solid fa-trash"></i>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })

                                                }


                                            </tbody>
                                        </table>
                                    </div>

                                    <div className='w-full flex justify-end mt-5'>
                                        <div className='flex items-center mb-5 mr-3'>
                                            <button onClick={first} className='bg-[rgb(252,185,53)] text-white px-2 py-1 rounded'>First</button>
                                            <i onClick={previous} class="fa-solid fa-chevron-left cursor-pointer ml-3"></i>
                                            <p className='ml-2'>{pageNumber}</p>
                                            <i onClick={next} class="fa-solid fa-chevron-right ml-3 cursor-pointer"></i>
                                            <button onClick={last} className='bg-[rgb(252,185,53)] text-white px-2 py-1 ml-3 rounded'>Last</button>
                                        </div>
                                    </div>

                                </div>

                                :
                                <>
                                    <div className='p-5 text-2xl font-[500]'>User not found</div>
                                </>
                        }




                    </div>


                </div>


                {/* {popupObject && <AdminPopup popupObject={popupObject} setpopupObject={setpopupObject} />} */}

            </div>
        </>
    )
}

export default Orders