import React, { useEffect, useState } from "react";
import { Box, Typography, Input, List, ListItemButton, Button } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import axios from "../../hooks/axios";
import PermanentDrawer from "./CreateProduct";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Products = () => {
  const [product] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/products",
  });
  const [category] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/categories",
  });
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState();
  const [inputText, setInputText] = useState();

  const clickHandler = (e) => {
    const value = e.currentTarget.getAttribute("value");
    if (filterCategory.includes(value)) {
      setFilterCategory(filterCategory.filter((entry) => entry !== value));
    } else {
      setFilterCategory([...filterCategory, value]);
    }
    
  };

  useEffect(() => {
    setFilterProducts(product);
    if (filterCategory.length) {
      const TempProducts = product?.filter((entry) => {
        return filterCategory.includes(entry.category.title);
      });
      setFilterProducts(TempProducts);
    } 
  }, [filterCategory, product]);

  let inputHandler = (e) => {
    setInputText(e.target.value);
    e.preventDefault();
  };
  

  useEffect(()=>{
    if (inputText?.length > 0) {
    console.log(inputText)
    const tempProduct = product.filter((entry) => {
       return entry.name === inputText
     });
     setFilterProducts(tempProduct)
   } else {
    setFilterProducts(product)
   }},[inputText])

   const [editProduct, setEditProduct] = useState()

   const updateHandler = (e)=> {
      const value = e.currentTarget.getAttribute("value");
     <PermanentDrawer/>
      
    } ;
  
    


  return (
    filterProducts && (
      <Box display="flex" >
        <Box width="70%">
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <h1>Products</h1>
            <Input
              type="search"
              sx={{
                height: 10,
                border: 1,
                borderRadius: 1,
                width: "40%",
                textAlign: "center",
                p: 3,
              }}
              onChange={inputHandler}
              placeholder="Product Search"
            ></Input>
            <Box>
              <PermanentDrawer />
            </Box>
          </Box>
          <Box
            display="flex"
            sx={{ flexWrap: "wrap", margin: 5, textAlign: "center" }}
          >
            {filterProducts.map((item) => {
              return (
                <Box
                  sx={{
                    margin: 3,
                    width: 1 / 4,
                    height: 500,
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 8,
                  }}
                  key={item.id}
                >
                  <Box display="flex" sx={{ml: 4}}>
                  <Box sx={{width: 300, height: 100, mb:2}}>
                  <img
                    src={item?.images[0]?.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 70,
                      marginTop: 25,
                    }}
                  />
                  </Box>
                  <ListItemButton value={item.id} onClick={updateHandler}>
                  <MoreVertIcon/>
                  </ListItemButton>
                  </Box>

                  <Typography
                    variant="h3"
                    sx={{
                      margin: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      margin: 3,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h10"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                      margin: 3,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography variant="h3" color="grey" sx={{ margin: 3 }} value={item.id}>
                    #{item.id}
                  </Typography>
                  <Typography variant="h2" sx={{ margin: 3 }}>
                    US${item.price}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box width="30%" sx={{ ml: 5 }}>
          <h3>Use tags to filter your Search</h3>
          <List>
            <ListItemButton
              sx={{
                display: "inline-block",
                border: 1,
                bgcolor: "white",
                color: "black",
                borderRadius: 3,
                m: 1,
              }}
              onClick={() => {
                setFilterProducts(product);
              }}
              key={Math.random()}
            >
              All
            </ListItemButton>
            {category &&
              category.map((e) => {
                return (
                  <List
                    key={Math.random()}
                    sx={{
                      display: "inline-block",
                      border: 1,
                      bgcolor: "white",
                      color: "black",
                      borderRadius: 3,
                      m: 1,
                    }}
                  >
                    <ListItemButton
                      onClick={clickHandler}
                      value={e.title}
                      key={e.id}
                    >
                      {e.title}
                    </ListItemButton>
                  </List>
                );
              })}
          </List>
        </Box>
      </Box>
    )
  );
};

export default Products;
