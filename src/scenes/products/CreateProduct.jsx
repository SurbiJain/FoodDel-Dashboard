import { Box, Typography, Drawer, Input } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, useFormik } from "formik";
import axios from "../../hooks/axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { editProductContext, openContext } from "./../../global/context";
import { FileUploader } from "react-drag-drop-files";

export default function PermanentDrawer() {
  const { open, setOpen } = useContext(openContext);
  const { editProduct, setEditProduct } = useContext(editProductContext);
  const [value, setValue] = useState("enable");
  const [imageUploadedPath, setImageUploadedPath] = useState("");
  const [file, setFile] = useState("");
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [category, setCategory] = useState();

  useEffect(() => {
    axios.get("/categories").then(function (response) {
      setCategory(response.data);
    });
  }, []);

  function handleImageChange(file) {
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setImageUploadedPath(response.data.url);
      });
  }
  useEffect(() => {
    if (editProduct) {
      formik.setValues({
        id: editProduct.id,
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        activeStatus: editProduct.isActive,
        url: editProduct.images[0]?.url,
        categories: editProduct.category?.title,
      });
    } else {
      formik.setValues({
        id: "",
        name: "",
        description: "",
        price: "",
        activeStatus: "",
        url: "",
        categories: "",
      });
    }
  }, [editProduct]);

  const HandleCategoryChange = (event) => {
    formik.handleChange(event);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
    formik.handleChange(event);
  };

  const editHandler = (e) => {
    axios
      .patch(`/products/${e.id}`, {
        category: { id: editProduct.id },
        description: e.description,
        images: [
          {
            name: editProduct.images[0]?.name,
            status: editProduct.images[0]?.status,
            type: editProduct.images[0]?.type,
            uid: editProduct.images[0]?.uid,
            url: editProduct.images[0]?.url,
          },
          { isActive: e.activeStatus },
          { name: e.name },
          { price: e.price },
        ],
      })
      .then(function (response) {
        console.log(response);
      });
  };
  const postHandler = (e) => {
    axios.post("/products", e).then((response) => {
      console.log(response);
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      categories: "",
      activeStatus: "",
      url: "",
    },

    onSubmit: (values) => {
      values = { ...values, url: imageUploadedPath };
      if (editProduct && editProduct.id) {
        editHandler(values);
      } else {
        postHandler(values);
      }
      setOpen(false);
    },
  });

  const list = (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: 500 }}
      role="presentation"
    >
      <Formik>
        <Form onSubmit={formik.handleSubmit}>
          <List sx={{ padding: 3 }}>
            <ListItem disablePadding sx={{ mb: 3 }}>
              <Typography variant="h3" textAlign="center">
                Create Product
              </Typography>
            </ListItem>
            <Box>
              <InputLabel>Add Image</InputLabel>
              <FileUploader
                handleChange={handleImageChange}
                name="file"
                types={fileTypes}
              />
              <Box
                sx={{
                  border: 1,
                  borderRadius: 1,
                  width: "100%",
                  display: "flex",
                  p: 1,
                  mt: 2,
                }}
              >
                <img
                  src={
                    formik.values.url ? formik.values.url : imageUploadedPath
                  }
                  style={{ width: 50, height: 50 }}
                />
                <a
                  href={
                    formik.values.url ? formik.values.url : imageUploadedPath
                  }
                  variant="h12"
                  style={{ alignSelf: "center", marginLeft: "12px" }}
                >
                  {editProduct ? editProduct.images[0]?.name : file?.name}
                </a>
              </Box>
            </Box>

            <InputLabel>Product Name</InputLabel>
            <ListItem disablePadding>
              <OutlinedInput
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name ? formik.values.name : ""}
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
                value={
                  formik.values.description ? formik.values.description : ""
                }
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
                value={formik.values.price ? formik.values.price : 0}
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
                    type="select"
                    id="demo-simple-select"
                    value={
                      formik.values.categories ? formik.values.categories : ""
                    }
                    label="Category"
                    onChange={HandleCategoryChange}
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
                  defaultChecked="'enable'"
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
        <Drawer
          anchor={"right"}
          open={open}
          onClose={(e) => {
            setOpen(false);
            setEditProduct("");
          }}
        >
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
