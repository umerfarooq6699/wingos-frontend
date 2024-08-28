import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../assets/Images/slide1.jpeg'
import slide2 from '../assets/Images/slide2.jpeg'

const NextArrow = ({onClick}) => {
    return (
        <>
            <div onClick={onClick} className='w-[30px] h-[20px] flex justify-center items-center z-10 cursor-pointer absolute bottom-5 lg:bottom-9 left-[50%] -translate-x-[50%]'>
                <div  className='w-[25px] h-[2px] bg-white'></div>
            </div>
        </>
    );
};


const PrevArrow = ({onClick}) => {
    return (
        <>
            <div onClick={onClick} className='w-[30px] h-[20px] ml-4 flex justify-center items-center z-10 cursor-pointer absolute bottom-5 lg:bottom-9 left-[50%]'>
                <div className='w-[25px] h-[2px] bg-white'></div>
            </div>
        </>
    );
};

const HeroSection = () => {



    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000, // The interval in milliseconds between each slide
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false, // Pauses autoplay when hovering over the slider
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    return (
        <>
            <div className='w-[100%] h-[25vh] md:h-[60vh] lg:h-[89vh] relative'>
                <div className="slider-container">
                    <Slider {...settings}>
                        <div className='w-[100%] h-[25vh] md:h-[60vh] lg:h-[89vh]'>
                            <img src={slide1} className='w-full h-full' alt="" />
                        </div>
                        <div className='w-[100%] h-[25vh] md:h-[60vh] lg:h-[89vh]'>
                            <img src={slide2} className='w-full h-full' alt="" />
                        </div>
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default HeroSection

