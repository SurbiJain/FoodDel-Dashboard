import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Input,
  List,
  ListItemButton,
  Button,
} from "@mui/material";
import axios from "../../hooks/axios";
import PermanentDrawer from "./../products/CreateProduct";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { editProductContext, openContext } from "./../../global/context";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState();
  const [inputText, setInputText] = useState();
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState();
  const storeId = useParams().storeId;

  useEffect(() => {
    axios.get(`/stores/${storeId}`).then(function (response) {
      setProduct(response.data.products);
      
    });

    axios.get("/categories").then(function (response) {
      setCategory(response.data);
    });
  }, []);

  const handleChange = (index, event) => {
    let productsBody = product;
    productsBody[index].stock = Number(event.target.value);

    axios
      .patch(
        `/stores/${storeId}`,productsBody
      )
      .then(function (response) {
        console.log(response);
      });
  };

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

  useEffect(() => {
    if (inputText?.length > 0) {
      const tempProduct = product.filter((entry) => {
        return entry.name === inputText;
      });
      setFilterProducts(tempProduct);
    } else {
      setFilterProducts(product);
    }
  }, [inputText]);

  const updateHandler = (item) => {
    setOpen(true);
    setEditProduct(item);
  };

  const drawerHandler = () => {
    setOpen(true);
  };

  return (
    filterProducts && (
      <Box display="flex">
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
            <openContext.Provider value={{ open, setOpen }}>
              <editProductContext.Provider
                value={{ editProduct, setEditProduct }}
              >
                <Box>
                  <Button
                    variant="contained"
                    onClick={drawerHandler}
                    sx={{ color: "black", bgcolor: "white" }}
                  >
                    Add Product
                  </Button>
                  <PermanentDrawer />
                </Box>
              </editProductContext.Provider>
            </openContext.Provider>
          </Box>
          <Box
            display="flex"
            sx={{ flexWrap: "wrap", margin: 5, textAlign: "center" }}
          >
            {filterProducts?.map((item, index) => {
              return (
                <Box
                  sx={{
                    margin: 2,
                    width: 1 / 4,
                    height: 500,
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 8,
                  }}
                  key={item.id}
                >
                  <Box display="flex" sx={{ ml: 4 }}>
                    {item.images && (
                      <Box sx={{ width: 300, height: 80, mb: 2 }}>
                        <img
                          src={item.images[0]?.url}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "60%",
                            marginTop: 25,
                          }}
                        />
                      </Box>
                    )}

                    <ListItemButton onClick={() => updateHandler(item)}>
                      <MoreVertIcon />
                    </ListItemButton>
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      margin: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
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
                  <Typography
                    variant="h3"
                    color="grey"
                    sx={{ margin: 3 }}
                    value={item.id}
                  >
                    #{item.id}
                  </Typography>
                  <Input
                    type="number"
                    variant="outlined"
                    sx={{
                      width: 100,
                      border: "1px solid black",
                      color: "black",
                      borderRadius: 1,
                      pl: 1,
                    }}
                    defaultValue={item.stock}
                    onChange={(e)=>{handleChange( index, e)}}
                  />
                  <Typography variant="h3" sx={{ margin: 3 }}>
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

export default EditProduct;
