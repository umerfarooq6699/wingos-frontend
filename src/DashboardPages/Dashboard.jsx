import React, { useEffect, useState } from 'react'
import Sidebar from "../DashboardPages/Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { dashboardPage, getDashboardData } from '../../Slices/adminSlice'
import DashboardNavbar from './DashboardNavbar'
import { useNavigate } from 'react-router-dom'
import Bar from './Charts/DonutChart'
import Donut from './Charts/BarChart'
import chartone from '../assets/Images/chart1.png'
import charttwo from '../assets/Images/chart2.png'
import chartthree from '../assets/Images/chart3.png'


const Dashboard = () => {
  const { notification } = useSelector(state => state.Dashboard)
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDashboardData())
  }, [])

  useEffect(() => {
    dispatch(dashboardPage(0))
    if (User?.role) {
      if (User.role === "user") {
        navigate("/")
      }
    }
  }, [User])

  



  

  console.log(User, "dashboard user")

  return (
    <>
      <div className='w-full h-max'>
        <DashboardNavbar />
        <div className='w-full h-[89vh] grid grid-cols-5'>

          <div className='hidden lg:block'>
            <Sidebar />
          </div>

          <div className='h-auto col-span-5 lg:col-span-4 bg-[rgb(235,238,240)] p-2 scroll-auto overflow-y-auto'>
            <div className='dashboard_data justify-around mt-[20px]'>
              
              <div className='bg-white w-[100%] md:w-[30%] h-auto pt-[1px]'>
                <h1 className='text-xl text-[rgb(73,80,87)] font-[600] mt-9 ml-5'>Total Products</h1>
                <h1 className='text-xl text-[rgb(73,80,87)] font-[700] ml-5'>{notification?.data?.totalProducts}</h1>
                <div className='w-full'>
                  <img src={chartone} className='w-full h-full' alt="" />
                </div>
                <div className='w-full h-[3px] bg-[rgb(121,215,166)]'></div>
              </div>

              <div className='bg-white w-[100%] md:w-[30%] h-auto pt-[1px] mt-5 md:mt-0'>
                <h1 className='text-xl text-[rgb(73,80,87)] font-[600] mt-9 ml-5'>Total Users</h1>
                <h1 className='text-xl text-[rgb(73,80,87)] font-[700] ml-5'>{notification?.data?.totalUsers}</h1>
                <div className='w-full'>
                  <img src={charttwo} className='w-full h-full' alt="" />
                </div>
                <div className='w-full h-[3px] bg-[rgb(81,165,255)]'></div>
              </div>

              <div className='bg-white w-[100%] md:w-[30%] h-auto py-1 mt-5 md:mt-0'>
                <h1 className='text-xl text-[rgb(73,80,87)] font-[600] mt-9 ml-5'>Total Orders</h1>
                <h1 className='text-xl text-[rgb(73,80,87)] font-[700] ml-5'>{notification?.data?.totalOrders}</h1>
                <div className='w-full'>
                  <img src={chartthree} className='w-full h-full' alt="" />
                </div>
                <div className='w-full h-[3px] bg-[rgb(251,221,147)]'></div>
              </div>



            </div>

            <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 mt-5 md:mt-9'>

              <div className='w-full'>
                <Donut/>
              </div>

              <div className='w-full'>
                <Bar/>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard