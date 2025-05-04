import React, { use } from 'react'
import { useAppContext } from '../context/AppContext'

function AllProducts() {

    const {products} = useAppContext()
  return (
    <div className='mt-16 flex flex-col'>
        <div></div>
    </div>
  )
}

export default AllProducts