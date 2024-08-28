import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgetEmail } from '../../Slices/userSlice'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const [email, setemail] = useState("")
    const inputData = (e) => {
        setemail(e.target.value)
    }
    const submit = () => {
        dispatch(forgetEmail({ email: email }))
    }
    console.log(email)
    return (
        <>
            <div className='w-full h-[90vh] flex justify-center items-center px-3'>
                <div className='w-[400px] h-[30vh] bg-white border-2 border-[rgb(252,185,53)] rounded-xl p-5 py-2'>
                    <input onChange={inputData} type="text" placeholder='Email' name='password' className='w-full mt-5 px-2 py-1 border border-black rounded ' /><br />
                    <button onClick={submit} className='bg-[rgb(252,185,53)] text-white rounded px-2 py-1 mt-5 cursor-pointer'>Submit</button>
                    <div class="text-grey-dark mt-4">
                        Don't have an account?
                        <Link to="/Signup">
                            Sign Up
                        </Link>.
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword