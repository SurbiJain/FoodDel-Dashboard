import React, { useEffect, useState } from "react";
import axios from "../../hooks/axios";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { FileUploader } from "react-drag-drop-files";
import { Box } from "@mui/material";
import { InputLabel } from "@mui/material";

const CourierDetails = () => {
  const [review, setReview] = useState();
  let result = [];
  const [courier, setCourier] = useState();
  const [editTable, setEditTable] = useState(false);
  let courierList = [];
  const courierId = useParams().courierId;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [file, setFile] = useState("");
  const [imageUploadedPath, setImageUploadedPath] = useState("");
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [store, setStore] = useState();
  const [vehicle, setVehicle] = useState();

  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  let navigate = useNavigate();

  const handleDelete = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setEditTable(!editTable);
  };
  const handleClose = () => {
    setAnchorEl(null);
    axios.delete(`/couriers/${courierId}`).then((response) => {
      navigate("/couriers");
      console.log(response);
    });
  };

  useEffect(() => {
    let ignore = false;
    axios.get(`/couriers/${courierId}`).then((response) => {
      if (!ignore) {
        setCourier(response.data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    axios.get("/stores").then((response) => {
      setStore(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/vehicles").then((response) => {
      setVehicle(response.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      gsm: "",
      address: "",
      email: "",
      accountNumber: "",
      store: "",
      vehicle: "",
      vehicleId: "",
      url: "",
    },

    onSubmit: (values) => {
      setEditTable(!editTable);
      values = {
        ...values,
        url: imageUploadedPath ? imageUploadedPath : courier.avatar[0]?.url,
      };
      console.log(values);

      axios
        .patch(`/couriers/${courierId}`, {
          accountNumber: values.accountNumber,
          address: values.address,
          email: values.email,
          gsm: values.gsm,
          licensePlate: values.vehicleId,
          name: values.name,
          store: { id: Number(values.store) },
          vehicle: { id: Number(values.vehicle) },
          avatar: [
            {
              uid: courier.avatar[0].uid,
              type: courier.avatar[0].type,
              size: courier.avatar[0].size,
              name: courier.avatar[0].name,
              url: values.url,
            },
          ],
        })
        .then((response) => {
          setCourier(response.data);
        })
        .then(() => {
          handleClickSuccess();
        });
    },
  });
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
    if (editTable) {
      formik.setValues({
        accountNumber: courier.accountNumber,
        address: courier.address,
        email: courier.email,
        gsm: courier.gsm,
        vehicleId: courier.licensePlate,
        name: courier.name,
        store: courier.store?.id,
        vehicle: courier.vehicle?.id,
        url: courier.avatar[0]?.url,
      });
    } else {
      formik.setValues({
        status: "",
        accountNumber: "",
        address: "",
        email: "",
        gsm: "",
        vehicleId: "",
        name: "",
        store: "",
        vehicle: "",
        url: "",
      });
    }
  }, [editTable]);

  useEffect(() => {
    axios
      .get("/reviews")

      .then((response) => {
        setReview(response.data);
      });
  }, []);

  useEffect(() => {
    review?.map((e) => {
      courierList.push({ courier: e.order.courier, rating: e.star });
    });
    result = courierList.filter((e) => {
      return e.courier.id === courierId;
    });
  }, []);

  return (
    courier && (
      <div className="editStore">
        <div>
          <Link to="./..">
            <button
              style={{
                height: 30,
                width: 100,
                marginBottom: 20,
                border: 1,
                borderRadius: 5,
              }}
            >
              Couriers
            </button>
          </Link>
        </div>
        <hr style={{ borderColor: "#5c5c5c", width: "100%" }} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ margin: 20 }}>
            {editTable ? (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ width: 100, mr: 2 }}>
                  <img
                    src={
                      imageUploadedPath
                        ? imageUploadedPath
                        : courier.avatar[0]?.url
                    }
                    style={{ width: "100%", borderRadius: 50 }}
                  />
                </Box>
                <FileUploader
                  handleChange={handleImageChange}
                  name="file"
                  types={fileTypes}
                />
              </Box>
            ) : (
              <Box sx={{ width: 100 }}>
                <img
                  src={courier.avatar[0]?.url}
                  style={{ width: "100%", borderRadius: 50 }}
                />
              </Box>
            )}
          </div>
          <h1>
            {courier && editTable ? (
              <input
                name="name"
                type="text"
                defaultValue={courier.name}
                onChange={formik.handleChange}
              />
            ) : (
              courier.name
            )}
          </h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="table_container">
            <table className="store_table">
              <tbody>
                <tr className="row-style">
                  <th variant="head">Status</th>
                  <td>{courier.status.text}</td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Email</th>
                  <td>
                    {editTable ? (
                      <input
                        name="email"
                        type="text"
                        defaultValue={courier.email}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      courier.email
                    )}
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Address</th>
                  <td>
                    {editTable ? (
                      <input
                        name="address"
                        type="text"
                        defaultValue={courier.address}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      courier.address
                    )}
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Phone</th>
                  <td style={{ borderBottom: "none !important" }}>
                    {editTable ? (
                      <input
                        type="text"
                        name="gsm"
                        defaultValue={courier.gsm}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      courier.gsm
                    )}
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Account No.</th>
                  <td style={{ borderBottom: "none !important" }}>
                    {editTable ? (
                      <input
                        type="text"
                        name="accountNumber"
                        defaultValue={courier.accountNumber}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      courier.accountNumber
                    )}
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Store</th>
                  <td
                    className="select"
                    style={{ borderBottom: "none !important" }}
                  >
                    {editTable ? (
                      <select
                        name="store"
                        onChange={formik.handleChange}
                        defaultValue={"placeholder"}
                      >
                        <option value={"placeholder"}>
                          {courier.store?.title}
                        </option>
                        {store?.map((element) => {
                          return (
                            <option key={element.id} value={element.id}>
                              {element.title}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      courier.store?.title
                    )}
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Vehicle</th>
                  <td>
                    {editTable ? (
                      <select
                        name="vehicle"
                        onChange={formik.handleChange}
                        defaultValue={"placeholder"}
                      >
                        <option value={"placeholder"}>
                          {courier.vehicle?.model}
                        </option>
                        {vehicle?.map((element) => {
                          return (
                            <option key={element.id} value={element.id}>
                              {element.model}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      courier.vehicle?.model
                    )}
                  </td>
                </tr>
                <tr className="row-style" style={{ borderBottom: "none" }}>
                  <th variant="head">Vehicle Id</th>
                  <td style={{ borderBottom: "none !important" }}>
                    {editTable ? (
                      <input
                        type="text"
                        name="vehicleId"
                        defaultValue={courier.licensePlate}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      courier.licensePlate
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <div>
              <button onClick={handleDelete}>Delete</button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>cancel</MenuItem>
              </Menu>
            </div>
            {editTable ? (
              <button type="submit" onClick={formik.handleSubmit}>
                Save
              </button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleCloseSuccess}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleCloseSuccess}
                severity="success"
                sx={{ width: 500 }}
              >
                <h1> Successfull</h1>
                <p>Stores editted successfully!</p>
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    )
  );
};

export default CourierDetails;
