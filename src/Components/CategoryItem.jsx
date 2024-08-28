import React from 'react'

const CategoryItem = ({selectedCategory, e, handlecategory}) => {

    
    return (
        <div onClick={() => handlecategory(e.name)} className={`w-max text-nowrap  text-[rgb(245,176,37)] hover:bg-[rgb(245,176,37)] ${e.name === selectedCategory ? "bg-[rgb(245,176,37)] text-white" : ""} uppercase font-[600] rounded px-3 py-2 hover:text-white cursor-pointer ml-5`}>
            <a href={e.url}>{e.name}</a>
        </div>
    )
}

export default CategoryItem