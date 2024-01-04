import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import axios from "../../hooks/axios";

const Products = () => {
  const [product] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/products",
  });
  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    product && (
      <Box>
        <Box>
          <Typography>Header</Typography>
        </Box>
        <Box
          display="flex"
          sx={{ flexWrap: "wrap", margin: 5, textAlign: "center" }}
        >
          {product.map((item) => {
            return (
              <Box
                sx={{
                  margin: 3,
                  width: 1 / 4,
                  bgcolor: "white",
                  color: "black",
                  borderRadius: 8,
                }}
              >
                <img
                  src={item.images[0].url}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 70,
                    marginTop: 25,
                  }}
                />

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
                <Typography variant="h3" color="grey" sx={{ margin: 3 }}>
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
    )
  );
};

export default Products;
