import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
// import Slider from 'react-slick'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
    const [selectedCategory, setselectedCategory] = useState("")
    const [seelctedIndex, setseelctedIndex] = useState(0)
    let slider = useRef(null)

    const { pizzaHourTop, starFlavourTop, plattersTop, classicFlavoursTop, crownPizzaTop, burgersTop, newBurgersTop, specialPastaTop, wingsTop, friedChickenTop, dipsTop } = useSelector(state => state.Cart)

    // const settings = {
    //     // className: "slider variable-width",
    //     dots: false,
    //     arrows: true,
    //     infinite: false,
    //     centerMode:false,
    //     slidesToShow: 7,
    //     slidesToScroll: 1,
    //     variableWidth: true,
    // };

    const array = [
        {
            name: "24 hour pizza deals",
            url: "#hour"
        },
        {
            name: "super star flavour",
            url: "#star"
        },
        {
            name: "platters",
            url: "#platters"
        },
        {
            name: "classic flavours",
            url: "#classic"
        },
        {
            name: "crown pizza",
            url: "#crown"
        },
        {
            name: "burgers",
            url: "#burgers"
        },
        {
            name: "new arrival burgers",
            url: "#newburgers"
        },
        {
            name: "special pasta",
            url: "#pasta"
        },
        {
            name: "house of wings",
            url: "#wings"
        },
        {
            name: "fried chicken",
            url: "#fried"
        },
        {
            name: "dips",
            url: "#dips"
        },

    ]
    const handlecategory = (obj) => {
        setselectedCategory(obj)
    }

    useEffect(() => {

        // window.addEventListener("scroll",()=>{
        // console.log(scrollY,"client top")
        // })

        window.addEventListener("scroll", () => {
            if (pizzaHourTop < window.innerHeight) {
                setselectedCategory("24 hour pizza deals")
            }
            if (starFlavourTop < window.innerHeight) {
                setselectedCategory("super star flavour")
            }
            if (plattersTop < window.innerHeight) {
                setselectedCategory("platters")
            }
            if (classicFlavoursTop < window.innerHeight) {
                setselectedCategory("classic flavours")
            }
            if (crownPizzaTop < window.innerHeight) {
                setselectedCategory("crown pizza")
            }
            if (burgersTop < window.innerHeight) {
                setselectedCategory("burgers")
            }
            if (newBurgersTop < window.innerHeight) {
                setselectedCategory("new arrival burgers")
            }
            if (specialPastaTop < window.innerHeight) {
                setselectedCategory("special pasta")
            }
            if (wingsTop < window.innerHeight) {
                setselectedCategory("house of wings")
            }
            if (friedChickenTop < window.innerHeight) {
                setselectedCategory("fried chicken")
            }
            if (dipsTop < window.innerHeight) {
                setselectedCategory("dips")
            }
        })

    }, [pizzaHourTop])


    useEffect(() => {
        setseelctedIndex(
            array.findIndex((e, i) => {
                return e.name === selectedCategory
            })
        )
    }, [selectedCategory])


    // useEffect(() => {
    //     slider.slickGoTo(seelctedIndex)
    // }, [seelctedIndex])


    

    return (
        <>
            <div className='w-[full] h-[55px] sticky top-0 z-10 bg-white shadow-2xl flex items-center overflow-auto hide-scrollbar'>
                {
                    array.map((e, i) => {
                        return (
                            <>
                                <div onClick={() => handlecategory(e.name)} className={`w-max text-nowrap capitalize hover:bg-[rgb(245,176,37)] ${e.name === selectedCategory ? "bg-[rgb(245,176,37)] text-white" : "text-[rgb(245,176,37)]"} font-[600] rounded px-3 py-2 hover:text-white cursor-pointer ml-5`}>
                                    <a href={e.url}>{e.name}</a>
                                </div>
                            </>
                        )
                    })
                }
            </div>



            {/* <div className="slider-container px-8 sticky top-0 bg-white z-10 border border-red-500">
                <Slider  className="gap-5" ref={e => {
                    slider = e;
                }} {...settings}>
                    {
                        array.map((e, i) => {
                            return (
                                    <div className='flex justify-center items-center px-2'>
                                    <div onClick={() => handlecategory(e.name)} className={`border border-blue-500 w-max text-nowrap  text-[rgb(245,176,37)] hover:bg-[rgb(245,176,37)] ${e.name === selectedCategory ? "bg-[rgb(245,176,37)] text-white" : ""} uppercase font-[600] rounded px-3 py-2 hover:text-white cursor-pointer`}>
                                        <a href={e.url}>{e.name}</a>
                                    </div>
                                    </div>
                            )
                        })
                    }
                </Slider>
            </div> */}

        </>
    )
}

export default Categories