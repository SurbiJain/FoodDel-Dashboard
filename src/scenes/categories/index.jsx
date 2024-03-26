import React, { useEffect, useState } from "react";
import axios from "../../hooks/axios";
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Categories = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    axios.get(`/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div style={{margin: "auto",
      width: "50%"}}>
     <h1>Categories</h1>
      <table border={5} >
      
        <thead>
          <tr>
            <th>Title</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>
                  {products?.map((product) => {
                    if (product?.category.id === e.id) {
                      return (
                        <img
                          src={product.images[0]?.url}
                          style={{
                            width: 30,
                            height: 30,
                            margin: 5,
                            borderRadius: 5,
                          }}
                          key={product.id}
                        />
                      );
                    }
                  })}
                </td>
                <td>{e.isActive === true ? <Button variant="outlined" color="success">
                <VisibilityOutlinedIcon sx={{margin: 0.5, fontSize:"small"}}/> Visible
</Button> : <Button variant="outlined" color="error">
Not Visible
</Button>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
