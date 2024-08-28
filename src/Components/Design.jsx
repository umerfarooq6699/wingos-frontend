import React, { useEffect } from 'react'
import StarFlavour from './StarFlavour'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../Slices/adminSlice'
import Burgers from './Burgers'
import Cart from './Cart'
import Popup from './Popup'
import Wings from './Wings'
import FriedChicken from './FriedChicken'
import ClassicFlavours from './ClassicFlavours'
import SpecialPasta from './SpecialPasta'
import HourPizza from './HourPizza'
import Platters from './Platters'
import CrownPizza from './CrownPizza'
import Dips from './Dips'
import NewArrivalBurgers from './NewArrivalBurgers'

const Design = () => {
    const dispatch=useDispatch()
    
    useEffect(()=>{
        dispatch(getProducts())
    },[])



    return (
        <>
            <div className='grid lg:grid-cols-4 mt-5'>

                <div className='lg:col-span-3 px-5'>
                    <HourPizza/>
                    <StarFlavour/>
                    <Platters/>
                    <ClassicFlavours/>
                    <CrownPizza/>
                    <Burgers/>
                    <NewArrivalBurgers/>
                    <SpecialPasta/>
                    <Wings/>
                    <FriedChicken/>
                    <Dips/>
                </div>

                <div className='hidden lg:block'>
                    <Cart/>
                </div>

            </div>
        </>
    )
}

export default Design