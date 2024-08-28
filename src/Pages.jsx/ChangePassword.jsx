import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, emptyNotification } from '../../Slices/userSlice'
import { Link } from 'react-router-dom'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const [token, settoken] = useState()
  const { notification } = useSelector(state => state.User)
  const [showPasswordOld, setShowPasswordOld] = useState(false)
  const [showPasswordNew, setShowPasswordNew] = useState(false)
  const [obj, setobj] = useState({
    oldPassword: "",
    newPassword: ""
  })
  const input = (e) => {
    setobj({ ...obj, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    settoken(localStorage.getItem("token") || "")
    if (notification && notification.message) {
      if (notification.success) {
        toast.success(notification.message)
      } else {
        toast.error(notification.message)
      }
    }
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 2000);
  }, [notification])

  const toggleOldPasswordVisibility = () => {
    setShowPasswordOld(!showPasswordOld);
  }
  const toggleNewPasswordVisibility = () => {
    setShowPasswordNew(!showPasswordNew);
  }


  console.log(obj)
  const handlePassword = () => {
    if(obj.oldPassword !== "" && obj.newPassword !== ""){
      dispatch(changePassword({ obj, token }))
      setobj({ oldPassword: "", newPassword: "" });
    }else{
      toast.error("Please fill all the fields")
    }
  }
  console.log(token, "change password token")
  console.log(notification, "notification")
  return (
    <>
      <div><Toaster /></div>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Change Password</h1>

            <div class="relative">
              <input
                onChange={input}
                type={showPasswordOld ? "text" : "password"}
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="oldPassword"
                placeholder="Old Password" value={obj.oldPassword} />
              <button
                type="button"
                onClick={toggleOldPasswordVisibility}
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer"
              >
                {showPasswordOld ? (
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a13.1 13.1 0 013.948-5.651M9.878 9.878a3 3 0 004.243 4.243M15.121 15.121A3 3 0 109.88 9.88M12.029 2.757A10.055 10.055 0 0112 5c7 0 10 7 10 7a13.1 13.1 0 01-3.948 5.651M6.21 6.21a13.066 13.066 0 00-4.82 5.272m11.368-6.194l-9.93 9.93"></path>
                  </svg>
                ) : (
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5C8.318 4.5 5.2 6.675 2.458 10.251a11.948 11.948 0 000 3.498C5.2 17.325 8.318 19.5 12 19.5c3.682 0 6.8-2.175 9.542-5.751a11.948 11.948 0 000-3.498C18.8 6.675 15.682 4.5 12 4.5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path>
                  </svg>
                )}
              </button>
            </div>


            <div class="relative">
              <input
                onChange={input}
                type={showPasswordNew ? "text" : "password"}
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="newPassword"
                placeholder="New Password" value={obj.newPassword} />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer"
              >
                {showPasswordNew ? (
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a13.1 13.1 0 013.948-5.651M9.878 9.878a3 3 0 004.243 4.243M15.121 15.121A3 3 0 109.88 9.88M12.029 2.757A10.055 10.055 0 0112 5c7 0 10 7 10 7a13.1 13.1 0 01-3.948 5.651M6.21 6.21a13.066 13.066 0 00-4.82 5.272m11.368-6.194l-9.93 9.93"></path>
                  </svg>
                ) : (
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5C8.318 4.5 5.2 6.675 2.458 10.251a11.948 11.948 0 000 3.498C5.2 17.325 8.318 19.5 12 19.5c3.682 0 6.8-2.175 9.542-5.751a11.948 11.948 0 000-3.498C18.8 6.675 15.682 4.5 12 4.5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path>
                  </svg>
                )}
              </button>
            </div>



            <button onClick={handlePassword}
              type="submit"
              class="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Change Password</button>

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

export default ChangePassword