import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyNotification, signup } from '../../Slices/userSlice'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { notification } = useSelector(state => state.User)
  const [showPassword, setShowPassword] = useState(false)
  const [obj, setobj] = useState({
    email: "",
    password: ""
  })
  const input = (e) => {
    setobj({ ...obj, [e.target.name]: e.target.value })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSignup = () => {
    const hasGmailDomain = obj.email.endsWith("@gmail.com");

    if (obj.email !== "" && obj.password !== "") {
      if (!hasGmailDomain) {
        toast.error("Email must be a @gmail.com address");
      } else if (obj.password.length < 8) {
        toast.error("Password must be at least 8 characters")
      }
      else {
        dispatch(signup(obj))
        setTimeout(() => {
          dispatch(emptyNotification())
          navigate("/signin")
        }, 2000);
      }
    } else {
      toast.error("Please fill all the fields")
    }
  }

  useEffect(() => {
    if (notification && notification.message) {
      if (notification?.success) {
        toast.success(notification.message)
        setobj({email:"",password:""})
      } else {
        toast.error(notification.message)
      }
    }
  }, [notification])

  console.log(obj, "signup obj")
  console.log(notification, "notification signupt")
  return (
    <>
     
      <div><Toaster /></div>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div class="bg-white px-6 py-8 rounded-xl border-2 border-[rgb(252,185,53)] text-black w-full">
            <h1 class="mb-8 text-2xl text-center">Sign up</h1>
            

            <input onChange={input}
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email" />

            <div class="relative">
              <input
                onChange={input}
                type={showPassword ? "text" : "password"}
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 cursor-pointer"
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


            <button onClick={handleSignup}
              type="submit"
              class="w-full text-center py-3 rounded bg-[rgb(252,185,53)] text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>

            <div class="text-grey-dark mt-6">
              Already have an account?
              <Link to="/signin">
                Log in
              </Link>.
            </div>

          </div>


        </div>
      </div>
    </>
  )
}

export default Signup