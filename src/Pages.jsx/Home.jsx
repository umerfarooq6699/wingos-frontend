import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import Design from '../Components/Design'
import HeroSection from '../Components/HeroSection'
import CartButton from '../Components/CartButton'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'

const Home = () => {

  // const hourPizza = useRef(null)
  // const [hourPizzaTop, sethourPizzaTop] = useState(0)
  
  
  // const starflavour = useRef(null)
  // const [starflavourTop, setstarflavourTop] = useState(0)


  // useEffect(()=>{
  //   window.addEventListener("scroll", () =>{
  //     sethourPizzaTop(hourPizza.current.getBoundingClientRect().top)
  //     setstarflavourTop(starflavour.current.getBoundingClientRect().top)
  //   })
  // },[])
  
  // console.log(hourPizzaTop, "topppppp");
  
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <Categories />
        <Design />
        <Footer/>
        <CartButton/>
    </>
  )
}

export default Home