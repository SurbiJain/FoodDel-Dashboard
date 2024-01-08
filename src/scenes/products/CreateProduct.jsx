import { Box, Typography, Drawer } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React, { useState } from "react";
import { Formik, Form, useFormik } from "formik";
import useAxios from "../../hooks/useAxios";
import axios from "../../hooks/axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function PermanentDrawer() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState("Enable");
  const [imageUploadedPath, setImageUploadedPath] = useState(null);
  // const [formValue, setFormValue] = useState();
  

  

  const [category] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/categories",
  });

  function handleImageChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(function (response) {
      setImageUploadedPath(response.data.url);
      
    });
  }
 
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    formik.handleChange(event);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
    formik.handleChange(event);
  };

  


//   const editProduct = async (name, price, descrition, categories, activeStatus, url) => {
//     const updateProduct = {
//         name = ,
//         price,
//         descrition,
//         categories,
//         activeStatus,
//         url
//     }

//     const response = await axios
//         .put("/products", updateProduct)
//         .catch((err) => {
//             console.log('Err', err);
//         });
// }

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      categories: "",
      activeStatus: "",
      url: ""
    },
    onSubmit: (values) => {
      values = {...values, url: imageUploadedPath};
      // editProduct(values);
    },
  });

  

  const list = (
    <Box display="flex"
    flexDirection="column" sx={{width: 500 }} role="presentation">
      <Formik >
        
        <Form onSubmit={formik.handleSubmit}>
        <List sx={{padding:3}}>
            <ListItem disablePadding sx={{mb: 3}}>
              <Typography variant="h3" textAlign="center">
                Create Product
              </Typography>
            </ListItem>
            <InputLabel>Add Image</InputLabel>
            <ListItem disablePadding> 
              <input type="file" onChange={handleImageChange} required  />
            </ListItem>
            <InputLabel>Product Name</InputLabel>
            <ListItem disablePadding>
              <OutlinedInput
                name="name"
                onChange={formik.handleChange}
                value={formik.values.search}
                placeholder="Add Product Name"
                fullWidth={true}
                required
              />
            </ListItem>
            <InputLabel id="demo-simple-select-label">Description</InputLabel>
            <ListItem disablePadding>
              <OutlinedInput
                name="description"
                onChange={formik.handleChange}
                value={formik.values.search}
                placeholder="Write Product Description"
                fullWidth={true}
                required
              />
            </ListItem>
            <InputLabel>Price</InputLabel>
            <ListItem disablePadding>
              <OutlinedInput
                name="price"
                onChange={formik.handleChange}
                value={formik.values.search}
                placeholder="Price"
                fullWidth={true}
                required
              />
            </ListItem>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            {category && (

              
              <ListItem>
                <FormControl fullWidth required>
                  
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                    name="categories"
                  >
                    {category &&
                      category.map((e) => {
                        return (
                          <MenuItem value={e.title} key={e.id}>
                            {e.title}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </ListItem>
            )}

            <ListItem>
              <FormControl required>
                <FormLabel>Active</FormLabel>
                <RadioGroup
                  name="activeStatus"
                  value={value}
                  onChange={handleValueChange}
                >
                  <FormControlLabel
                    value="enable"
                    control={<Radio />}
                    label="Enable"
                  />
                  <FormControlLabel
                    value="disable"
                    control={<Radio />}
                    label="Disable"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button variant="contained" type="submit" fullWidth={true}>
                Save
              </Button>
            </ListItem>
          </List>
        </Form>
      </Formik>
      </Box>
    
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button variant="contained" onClick={(e) => setOpen(true)} sx={{ color: "black", bgcolor:"white" }}>
          Add Product
        </Button>
        <Drawer anchor={"right"} open={open} onClose={(e) => setOpen(false)}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
