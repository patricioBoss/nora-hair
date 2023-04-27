import React from 'react'
import SvgIconStyle from './SvgIconStyle'

const Filter = ({categories,handleChange}) => {
  return (
    <div className="flex gap-4 mt-4 items-center">
    <SvgIconStyle
      src="/Assets/filter.svg"
      className=" text-[#4d4e4f]"
    />

    <div>
      <select
        id="category"
        name="category"
        placeholder="select categories"
        className="mt-1 block w-[300px] rounded-md border-none bg-[rgba(9,30,66,0.04)] py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        defaultValue=""
        onChange={handleChange}
      ><option value="" disabled hidden>
          select Category
        </option>
       {
        categories.map(category=><option key={category._id} value={category._id}> {category.name}</option>) 
        }
      </select>
    </div>
    </div>
  )
}

export default Filter
