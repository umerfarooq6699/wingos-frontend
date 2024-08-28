import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { productObj } from '../../Slices/adminSlice'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ProductsForm = () => {

    const [obj, setobj] = useState({
        name:"",
        price:"",
        category:""
    })
    const [path, setpath] = useState("")
    const navigate = useNavigate()

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
        if(obj.name !=="" && obj.price !=="" && obj.category !==""){
            dispatch(productObj(obj))
            toast.success("Product added successfully")
            setTimeout(() => {
                navigate("/dashboardProducts")
            }, 2000);
        }
        else{
          toast.error("Please fill all the fields")  
        }
    }

    console.log(obj,"object")
   
    return (
        <>
        <div><Toaster/></div>
            <div className='w-full h-screen flex justify-center items-center bg-gray-200'>
                <div className='w-[500px] h-auto p-5 bg-white rounded-xl'>

                    <div class="mb-4">
                        <input onChange={productPath} type="file" id="image" class="w-full rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700">Product Name</label>
                        <input onChange={inputData} type="text" id="name" placeholder='name' name="name" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <div class="mb-4">
                        <label for="price" class="block text-gray-700">Price</label>
                        <input onChange={inputData} type="number" id="price" placeholder='10$' name="price" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <div class="mb-4">
                        <label for="category" class="block text-gray-700">Category</label>
                        <input onChange={inputData} type="text" id="category" placeholder='category' name="category" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                    </div>

                    <button onClick={handleSubmit} type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Submit</button>


                </div>
            </div>
        </>
    )
}

export default ProductsForm