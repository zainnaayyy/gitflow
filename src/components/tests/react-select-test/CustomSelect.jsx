import React from 'react'
import Select from 'react-select'

const CustomSelect = ({onChange, options, value}) => {
  return (
    <div>
        <Select options={options} onChange={onChange} value={value}/>
    </div>
    
  )
}

export default CustomSelect;
