import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getsingleproduct, productObj, updatedProduct } from '../../Slices/adminSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { emptyNotification } from '../../Slices/userSlice'

const ProductUpdateForm = () => {

    const [obj, setobj] = useState({})
    const [path, setpath] = useState("")
    const navigate=useNavigate()
    const { id } = useParams()
    const { notification } = useSelector(state => state.Dashboard)
    const dispatch = useDispatch()

    const productPath = (e) => {
        const file = e.target.files[0]
        if (file && file.type.includes("image")) {
            const data = new FormData()
            data.append("file", file)
            data.append("upload_preset", "zys5sepz")

            axios.post("https://api.cloudinary.com/v1_1/dqfjfh5wm/image/upload", data)

                .then((res) => {
                    setpath(res.data.secure_url)
                })
        }
    }

    const inputData = (e) => {
        setobj({ ...obj, [e.target.name]: e.target.value, path })
    }

    const handleSubmit = () => {
        dispatch(updatedProduct({ obj: obj, singleObj: notification?.data?.singleObject[0] }))
        navigate("/dashboardProducts")
    }

    useEffect(() => {
        dispatch(getsingleproduct(id))

    }, [])

    useEffect(() => {
        if (notification?.data?.singleObject && notification.data.singleObject.length > 0) {
            setobj(notification.data.singleObject[0])
        }
        setTimeout(() => {
            dispatch(emptyNotification())
        }, 2000);
    }, [notification])

    const handleCross=()=>{
        navigate("/dashboardProducts")
    }

    console.log(notification, "update notification")


    return (
        <>
            <div className='w-full h-screen flex justify-center items-center  bg-gray-200 px-3'>
                <div className='w-[500px] h-auto p-5 bg-white rounded-xl relative'>
                    <div onClick={handleCross} className='absolute top-2 right-2 cursor-pointer'>
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </div>

                    <div class="mb-4">
                        <input onChange={productPath} type="file" id="image" class="w-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700">Product Name</label>
                        <input onChange={inputData} value={obj.name} type="text" id="name" placeholder='name' name="name" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <div class="mb-4">
                        <label for="price" class="block text-gray-700">Price</label>
                        <input onChange={inputData} value={obj.price} type="number" id="price" placeholder='10$' name="price" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <div class="mb-4">
                        <label for="category" class="block text-gray-700">Category</label>
                        <input onChange={inputData} value={obj.category} type="text" id="category" placeholder='category' name="category" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <button onClick={handleSubmit} type="submit" class="bg-[rgb(244,176,37)] hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Submit</button>


                </div>
            </div>
        </>
    )
}

export default ProductUpdateForm