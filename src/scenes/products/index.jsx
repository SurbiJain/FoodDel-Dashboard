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
import PermanentDrawer from "./CreateProduct";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { editProductContext, openContext } from "./../../global/context";
import "./product.css";

const Products = () => {
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState();
  const [inputText, setInputText] = useState();
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios.get("/products").then(function (response) {
      setProduct(response.data);
    });

    axios.get("/categories").then(function (response) {
      setCategory(response.data);
    });
  }, []);

  const clickHandler = (e) => {
    let value = e.currentTarget.getAttribute("value");
    value = Number(value.replace(/[^0-9]/g, ""));

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
        return filterCategory.includes(entry.category.id);
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
    <>
    <div className="header">
    <Typography variant={width > 1000 ? "h1" : "h3"} fontWeight="bolder">
      Products
    </Typography>
    <Input
      className="search"
      type="search"
      onChange={inputHandler}
      placeholder="Product Search"
    ></Input>
    <openContext.Provider value={{ open, setOpen }}>
      <editProductContext.Provider
        value={{ editProduct, setEditProduct }}
      >
        <Button
          variant="contained"
          onClick={drawerHandler}
          sx={{ color: "black", bgcolor: "white" }}
        >
          Add Product
        </Button>
        <PermanentDrawer />
      </editProductContext.Provider>
    </openContext.Provider>
  </div>
  
    {filterProducts && (
      <div className="mainContainer">
       
        <div className="mainContent">
          <Typography variant={width > 1000 ? "h4" : "h6"}>
            Use tags to filter your Search
          </Typography>
          <List key={product.id}>
            <ListItemButton
              className="tags"
              onClick={() => {
                setFilterCategory([]);
                setFilterProducts(product);
              }}
              sx={{
                display: "inline-block",
                border: 1,
                backgroundColor: filterProducts === product ? "blue" : "white",
                color: "black",
                borderRadius: 3,
                margin: 1,
              }}
            >
              All
            </ListItemButton>
            {category &&
              category.map((e) => {
                return (
                  <ListItemButton
                    className="tags"
                    onClick={clickHandler}
                    value={e.id}
                    key={e.title}
                    sx={{
                      display: "inline-block",
                      border: 1,
                      backgroundColor: filterCategory.includes(e.id)
                        ? "blue"
                        : "white",
                      color: "black",
                      borderRadius: 3,
                      margin: 1,
                    }}
                    title={e.title}
                  >
                    {e.title}
                  </ListItemButton>
                );
              })}
          </List>

          <div className="container">
            {filterProducts?.map((item) => {
              return (
                <div className="productInfoContainer" key={item.id}>
                  <div className="moreIcon">
                    <ListItemButton onClick={() => updateHandler(item)}>
                      <MoreVertIcon />
                    </ListItemButton>
                  </div>
                  {item.images && (
                    <div className="avatarContainer">
                      <img className="avatar" src={item.images[0]?.url} />
                    </div>
                  )}

                  <Typography
                    variant={width > 1000 ? "h4" : "h6"}
                    fontWeight="bolder"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant={width > 1000 ? "h6" : "h10"}
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
                    variant={width > 1000 ? "h3" : "h4"}
                    color="grey"
                    value={item.id}
                  >
                    #{item.id}
                  </Typography>
                  <Typography
                    variant={width > 1000 ? "h3" : "h4"}
                    sx={{ margin: 3 }}
                  >
                    US${item.price}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    )
  }
    </>
  );
};

export default Products;
