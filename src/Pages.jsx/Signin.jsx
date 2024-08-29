import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Logged, emptyNotification, signin } from '../../Slices/userSlice'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const [obj, setobj] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const [token, settoken] = useState(localStorage.getItem("token") || "")
  const [showPassword, setShowPassword] = useState(false)
  const [User, setUser] = useState()
  const dispatch = useDispatch()
  const {client,notification } = useSelector(state => state.User)


  const input = (e) => {
    setobj({ ...obj, [e.target.name]: e.target.value })
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSignin = () => {
    if (obj.email !== "" && obj.password !== "") {
      dispatch(signin(obj))

    } else {
      toast.error("Please fill all the fields")
    }
  }

  useEffect(() => {
    settoken(localStorage.getItem("token") || "")
    setUser(JSON.parse(localStorage.getItem("user")) || "")
    if (notification && notification?.message) {
      if (notification.success) {
        toast.success(notification.message)
        setobj({email:"",password:""})
      } else {
        toast.error(notification.message)
      }
    }

    if(notification && notification.success){
      setTimeout(() => {
        dispatch(emptyNotification())
          if(client?.role == "user"){
            navigate("/")
          }else if(client?.role == "admin"){
            navigate("/dashboard")
          }
  
      }, 2000);
    }

  }, [notification])

  useEffect(() => {
    data()
  }, [token])

  const data = () => {
    dispatch(Logged(token))
  }

  // console.log(obj, "signup obj")
  // console.log(notification, "signin notification")
  // console.log(token, "signin token")
  // console.log(User, "user")
  // console.log(client, "client")
  return (
    <>
      <div><Toaster /></div>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded-xl border-2 border-[rgb(252,185,53)] text-black w-full">
            <h1 class="mb-8 text-2xl text-center">Sign In</h1>
            

            <input onChange={input}
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={obj.email} />

            <div class="relative">
              <input
                onChange={input}
                type={showPassword ? "text" : "password"}
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password" 
                value={obj.password} />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? (
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a13.1 13.1 0 013.948-5.651M9.878 9.878a3 3 0 004.243 4.243M15.121 15.121A3 3 0 109.88 9.88M12.029 2.757A10.055 10.055 0 0112 5c7 0 10 7 10 7a13.1 13.1 0 01-3.948 5.651M6.21 6.21a13.066 13.066 0 00-4.82 5.272m11.368-6.194l-9.93 9.93"></path>
                  </svg>
                ) : (
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5C8.318 4.5 5.2 6.675 2.458 10.251a11.948 11.948 0 000 3.498C5.2 17.325 8.318 19.5 12 19.5c3.682 0 6.8-2.175 9.542-5.751a11.948 11.948 0 000-3.498C18.8 6.675 15.682 4.5 12 4.5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path>
                  </svg>
                )}
              </button>
            </div>

            {/* <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password" /> */}

            <div className='flex justify-end'>
              <Link to="/forgetpasswordform">Forget Password?</Link>
            </div>

            <button onClick={handleSignin}
              type="submit"
              class="w-full text-center py-3 mt-3 rounded bg-[rgb(252,185,53)] text-white hover:bg-green-dark focus:outline-none my-1"
            >Sign In</button>

            <div class="text-grey-dark mt-6">
              <Link to="/changePassword">
                Change Password?
              </Link>
            </div>

            <div class="text-grey-dark mt-6">
              Don't have an account?
              <Link to="/Signup">
                Sign Up
              </Link>.
            </div>

          </div>


        </div>
      </div>
    </>
  )
}

export default Signin




