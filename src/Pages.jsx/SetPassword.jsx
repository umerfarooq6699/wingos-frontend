import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Setpassword = () => {
    const { token } = useParams()
    const [password, setpassword] = useState("")
    const inputData = (e) => {
        setpassword(e.target.value)
    }
    const submit = async () => {
        await axios.post("http://localhost:4000/setpassword", { newpassword: password }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data.notification)
            })
    }
    console.log(password)
    console.log(token, "Params")
    return (
        <>
            <div className='w-full h-[90vh] flex justify-center items-center'>
                <div className='w-[400px] h-[30vh] bg-white border border-black rounded-xl p-5'>
                    <input onChange={inputData} type="text" placeholder='new password' name='new password' className='w-full mt-5 px-2 py-1 border border-black rounded ' /><br />
                    <button onClick={submit} className='bg-blue-500 text-white rounded px-2 py-1 mt-5 cursor-pointer'>Submit</button>
                </div>
            </div>
        </>
    )
}

export default Setpassword