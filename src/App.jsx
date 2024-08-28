import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages.jsx/Signup'
import Signin from './Pages.jsx/Signin'
import Home from './Pages.jsx/Home'
import ChangePassword from './Pages.jsx/ChangePassword'
import Dashboard from './DashboardPages/Dashboard'
import Products from './DashboardPages/Products'
import ProductsForm from './DashboardPages/ProductsForm'
import Users from './DashboardPages/Users'
import Orders from './DashboardPages/Orders'
import ForgetPassword from './Pages.jsx/ForgetPassword'
import Setpassword from './Pages.jsx/SetPassword'
import ProductUpdateForm from './DashboardPages/ProductUpdateForm'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/forgetpasswordform' element={<ForgetPassword/>}/>
          <Route path='/changePassword' element={<ChangePassword/>}/>
          <Route path='/setpassword/:token' element={<Setpassword/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboardProducts' element={<Products/>}/>
          <Route path='/dashboardUser' element={<Users/>}/>
          <Route path='/dashboardOrder' element={<Orders/>}/>
          <Route path='/productsForm' element={<ProductsForm/>}/>
          <Route path='/productupdateform/:id' element={<ProductUpdateForm/>}/>
          <Route path='*' element={<h1>Error</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App