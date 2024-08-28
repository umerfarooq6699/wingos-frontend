import React from 'react'

const ProductPopup = ({ popupObject, setQuickView }) => {
  const remove = () => {
    setQuickView("")
  }

  const handleOverlay = (event) => {
    if (event.target.classList.contains("overlay")) {
      setQuickView("")
    }
  }

  return (
    <>
      <div onClick={handleOverlay} className='w-full h-screen fixed overlay cursor-crosshair top-0 left-0 bg-[rgba(0,0,0,0.800)] flex justify-center items-center'>
        <div className='w-[80%] md:w-[60%] lg:w-[40%] h-[70vh] md:h-[50vh] bg-white rounded-xl relative cursor-auto'>

          <div onClick={remove} className='text-3xl cursor-pointer absolute top-0 right-3'>&times;</div>

          <div className='w-full h-full mt-1 grid grid-cols-1 md:grid-cols-2'>

            <div className='w-full h-[40vh] md:h-[50vh] md:flex justify-center items-center mt-9 md:mt-0'>
              <div className='w-full h-[40vh] px-3 py-1'>
                <img src={popupObject.path} className='w-full h-full' alt="" />
              </div>
            </div>

            <div className='px-4 mt-0 md:flex items-center'>

              <div>
                <h1 className='font-[700] text-2xl text-[rgba(0,0,0,0.700)]'>{popupObject.name}</h1>
                <h1 className='text-gray-500 font-[500] mt-1'>Price: Rs{popupObject.price}</h1>
                <h1 className='text-gray-500 font-[500] mt-1'>Category: {popupObject.category}</h1>
              </div>

            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPopup