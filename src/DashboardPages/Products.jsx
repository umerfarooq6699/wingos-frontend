import React, { useEffect, useState } from 'react'
import Sidebar from "../DashboardPages/Sidebar"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardDeleteProduct, dashboardNotificationEmpty, dashboardPage, getProducts } from '../../Slices/adminSlice'
import Navbar from '../Components/Navbar'
import DashboardNavbar from './DashboardNavbar'
import ProductPopup from './ProductPopup'
import toast, { Toaster } from 'react-hot-toast'

const Products = () => {
    const [array, setarray] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [quickView, setQuickView] = useState("")
    const { notification } = useSelector(state => state.Dashboard)
    const [User,setUser]=useState(JSON.parse(localStorage.getItem("user")) || "")
    const dispatch = useDispatch()
    const [startIndex, setstartIndex] = useState(0)
    const [perPage, setperPage] = useState(5)
    const [pageNumber, setpageNumber] = useState(1)
    const navigate=useNavigate()


    useEffect(() => {
        dispatch(dashboardPage(1))
        dispatch(getProducts())
        if(User){
            if(User.role === "user"){
                navigate("/")
            }
        }
    }, [])


    useEffect(() => {
        console.log(notification?.data?.array,"chunk")
        if(notification?.data?.array){
            setTimeout(() => {
                setarray(notification?.data?.array.slice(startIndex, startIndex + 5))
            }, 1000);
        }
    }, [notification, startIndex])

    const search = (e) => {
        setarray(notification?.data?.array.filter((ele, i) => {
            return ele.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                ele.category.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }


    const handleDelete = (obj) => {
        dispatch(dashboardDeleteProduct(obj))
        toast.error(notification.message)
    }

    const handleView = (obj) => {
        setQuickView(obj)
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

    console.log(notification,'Products notification')

    return (
        <>
        <div><Toaster/></div>
            <div className='w-full h-screen'>
                <DashboardNavbar />
                <div className='w-full h-[89vh] grid grid-cols-5'>

                    <div className='hidden lg:block'>
                        <Sidebar />
                    </div>

                    <div className='col-span-5 lg:col-span-4 bg-gray-200 p-3 overflow-y-scroll'>

                        <div className='w-full md:flex justify-between'>
                            <h1 className='font-[600] text-xl'>Products</h1>

                            <div className='flex relative mt-2 lg:mt-0'>
                                <div className='absolute top-1 left-3'>
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <div className='w-full'>
                                    <input onChange={search} type="text" placeholder='Search by Name and Category' className='w-full lg:w-[400px] px-9 py-1 text-gray-500 rounded-full' />
                                </div>
                            </div>

                            <Link to="/productsForm">
                                <button className='px-2 py-1 mt-3 lg:mt-0 text-white rounded cursor-pointer bg-[rgb(252,185,53)]'>Add Products</button>
                            </Link>
                        </div>



                        {
                            array && array.length > 0 ?

                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 py-5">
                                    <div className='overflow-auto'>
                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">


                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3">
                                                        Image
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Price
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Category
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
                                                                    <td className='px-3 py-1'>
                                                                        <div className='w-[40px] h-[40px] rounded-full'>
                                                                            <img src={e.path} className='w-full h-full rounded-full' alt="" />
                                                                        </div>
                                                                    </td>
                                                                    <td class="px-6 py-4 text-nowrap">
                                                                        {e.name}
                                                                    </td>
                                                                    <td class="px-6 py-4">
                                                                        RS.{e.price}
                                                                    </td>
                                                                    <td class="px-6 py-4 text-nowrap">
                                                                        {e.category}
                                                                    </td>
                                                                    <td class="px-6 py-4 flex">
                                                                        <i onClick={() => handleView(e)} class="cursor-pointer text-green-500 fa-solid fa-eye"></i>
                                                                        <i onClick={() => handleDelete(e)} class="cursor-pointer text-red-500 ml-3 fa-solid fa-trash"></i>
                                                                        <Link to={`/productupdateform/${e._id}`}>
                                                                            <i class="cursor-pointer text-blue-600 ml-3 fa-solid fa-pen"></i>
                                                                        </Link>
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
                                        <div className='flex items-center mr-3'>
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
                                    <div className='p-5 text-2xl font-[500]'>Product not found</div>
                                </>
                        }




                    </div>


                </div>

                {quickView && <ProductPopup popupObject={quickView} setQuickView={setQuickView} />}

            </div>
        </>
    )
}

export default Products