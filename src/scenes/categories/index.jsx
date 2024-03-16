import React, { useEffect, useState } from 'react'
import axios from '../../hooks/axios'

const Categories = () => {
  const [categories, setCategories] = useState()
  const [products, setProducts] = useState();

  useEffect(()=>{
    axios.get(`/categories`)
    .then((res)=>{
      setCategories(res.data)
    })
  },[])
  useEffect(()=>{
    axios.get(`/products`)
    .then((res)=>{
      setProducts(res.data)
    })
  }, [])

  
  return (
    <div>
      <table border={5} style={{margin:30}}>
        <thead>
          <tr>
          <th>Title</th>
          <th>Product</th>
          <th>Status</th>
          </tr>
        </thead>
        <tbody>
      {categories?.map((e)=>{
        return(
        <tr key={e.id}>
        <td>{e.title}</td>
        <td>{products?.map( (product)=>{
          if (product?.category.id === e.id){
            return <img src={product.images[0]?.url} style={{width:30, height:30, margin:2}} key={product.id}/>
          }
        })}</td>
        <td>{e.isActive === true ? "Visible" : "Not Visible"}</td>
       
        </tr>
        )
        

      })}
      </tbody>
      </table>
    </div>
  )
}

export default Categories;