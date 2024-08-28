import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/Images/common.png"

const Navbar = () => {
    const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")) || {})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { count } = useSelector(state => state.User)
    const [checkUser, setcheckUser] = useState(false)
    const userMenuRef = useRef(null)

    const handleUser = () => {
        if (!checkUser) {
            setcheckUser(true)
        } else {
            setcheckUser(false)
        }
    }


    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/signin")
    }

    const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setcheckUser(false)
        }
    }

    useEffect(() => {
        if (checkUser) {
            document.addEventListener('click', handleClickOutside, true)
        } else {
            document.removeEventListener('click', handleClickOutside, true)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [checkUser])

    // console.log(checkUser)
    // console.log(user, "user")
    return (
        <>
            <div className='w-full h-[60px] bg-[rgb(217,148,54)] flex justify-between items-center px-9'>

                <div className='bg-[rgb(238,213,137)] text-[rgb(217,148,54)] hidden md:flex items-center rounded px-3 py-1 cursor-pointer'>
                    <i class="fa-solid fa-phone"></i>
                    <h1 className='ml-2 font-[700]'>03041112117</h1>
                </div>

                <div className='w-[50px]'>
                    <img src={logo} alt="" className='w-full h-full' />
                </div>

                {/* {
                    user?.role === "admin" &&
                    <Link to="/dashboard">
                        <div className='text-white cursor-pointer'>Admin</div>
                    </Link>
                } */}


                <div onClick={handleUser} className='w-[20px] h-[20px] ml-5 cursor-pointer relative flex justify-center items-center'>
                    <i title='user' className='fa-solid fa-user text-xl text-white'></i>
                </div>

                <div ref={userMenuRef} className={`w-[100px] h-max bg-white p-1 z-20 ${checkUser ? "block" : "hidden"} shadow rounded absolute top-[50px] right-9 p-1`}>
                    <ul>
                        <Link to="/signin">
                            <li className='cursor-pointer hover:bg-[rgb(245,176,37)] hover:text-white px-1 py-[2px] rounded'>Sign In</li>
                        </Link>
                        <Link to="/Signup">
                            <li className='cursor-pointer hover:bg-[rgb(245,176,37)] hover:text-white px-1 py-[2px] rounded'>Sign Up</li>
                        </Link>
                        <li onClick={handleLogout} className='cursor-pointer hover:bg-[rgb(245,176,37)] hover:text-white px-1 py-[2px] rounded'>Logout</li>

                    </ul>
                </div>

            </div>
        </>
    )
}

export default Navbar