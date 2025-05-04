import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'

function ProductCategory() {
    const {products} = useAppContext()
    const {category} = useParams()
    const searchCategory = category.find((item)=> item.path.toLowerCase() === category)
    
  return (
    <div>ProductCategory</div>
  )
}

export default ProductCategory