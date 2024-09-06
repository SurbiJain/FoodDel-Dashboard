import React, { useEffect, useState } from "react";
import axios from "../../hooks/axios";
import Button from "@mui/material/Button";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import "./category.css";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    <div className="mainContainer">
      <h1 className="category-head">Categories</h1>
      <div className="categoriesContainer categoriesTable">
        <table className="categories_table" border={1}>
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
                    <div className="imageData">
                      {products?.map((product) => {
                        if (product?.category.id === e.id) {
                          return (
                            <div className="imageContainer" key={Math.random()}>
                              <img
                                className="productImage"
                                src={product.images[0]?.url}
                                key={product.id}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </td>
                  <td>
                    {e.isActive === true ? (
                      <Button variant="outlined" color="success">
                        <VisibilityOutlinedIcon sx={{ fontSize: "small" }} />{" "}
                        Visible
                      </Button>
                    ) : (
                      <Button variant="outlined" color="error">
                        Not Visible
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
