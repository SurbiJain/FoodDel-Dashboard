import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../hooks/axios";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import map from "./images/map.png";

const EditStore = () => {
  const [store, setStore] = useState();
  const storeId = useParams().editId;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [courier, setCourier] = useState();
  const [review, setReview] = useState()
  const [editTable, setEditTable] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);

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
    axios.delete(`/stores/${storeId}`).then((response) => {
      navigate("/stores");
      console.log(response);
    });
  };

  useEffect(() => {
    axios.get(`/stores/${storeId}`).then(function (response) {
      setStore(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/couriers`).then(function (response) {
      setCourier(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/reviews`).then(function (response) {
      setReview(response.data);
    });
  }, []);
  
  const formik = useFormik({
    initialValues: {
      status: "",
      gsm: "",
      address: "",
      email: "",
      title: "",
    },

    onSubmit: (values) => {
      setEditTable(!editTable);

      axios
        .patch(`/stores/${storeId}`, {
          address: { text: values.address },
          title: values.title,
          gsm: values.gsm,
          isActive: values.status,
          email: values.email,
        })
        .then(function (response) {
          axios
            .get(`/stores/${storeId}`)
            .then(function (response) {
              setStore(response.data);
            })
            .then(() => {
              handleClickSuccess();
            });
        });
    },
  });
  useEffect(() => {
    if (editTable) {
      formik.setValues({
        status: store.isActive === true ? "Open" : "Close",
        gsm: store.gsm,
        address: store.address.text,
        email: store.email,
        title: store.title,
      });
    } else {
      formik.setValues({
        status: "",
        gsm: "",
        address: "",
        email: "",
        title: "",
      });
    }
  }, [editTable]);

  return (
    store && (
      <div className="editStore">
        <div>
          <Link to="./../..">
            <button
              style={{
                height: 30,
                width: 100,
                marginBottom: 20,
                border: 1,
                borderRadius: 5,
              }}
            >
              Stores
            </button>
          </Link>
        </div>
        <hr style={{ borderColor: "#5c5c5c", width: "100%" }} />
        <h1>
          {store && editTable ? (
            <input
              name="title"
              type="text"
              defaultValue={store.title}
              onChange={formik.handleChange}
            />
          ) : (
            store.title
          )}
        </h1>

        <div
          style={{
            display: "flex",
            width:"100%"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column"}}
          >
            <div className="table_container">
              <table className="store_table">
                <tbody>
                  <tr className="row-style">
                    <td variant="head">Status</td>
                    <td>
                      {editTable ? (
                        <>
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="Open"
                              defaultChecked={store.isActive === true}
                              onChange={formik.handleChange}
                            />
                            Open
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="Closed"
                              defaultChecked={store.isActive === false}
                              onChange={formik.handleChange}
                            />
                            Closed
                          </label>
                        </>
                      ) : store.isActive === true ? (
                        "Open"
                      ) : (
                        "Closed"
                      )}
                    </td>
                  </tr>
                  <tr className="row-style">
                    <td variant="head">Email</td>

                    <td>
                      {editTable ? (
                        <input
                          name="email"
                          type="text"
                          defaultValue={store.email}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        store.email
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
                          defaultValue={store.address.text}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        store.address.text
                      )}
                    </td>
                  </tr>
                  <tr className="row-style" style={{ borderBottom: "none" }}>
                    <td variant="head">Phone</td>
                    <td style={{ borderBottom: "none !important" }}>
                      {editTable ? (
                        <input
                          type="text"
                          name="gsm"
                          defaultValue={store.gsm}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        store.gsm
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

          <div style={{marginLeft:20}}>
            <div style={{ display: "flex", flexDirection: "column",  }}>
              <img
                src={map}
                style={{
                  width: "100%",
                  height: "50%",
                  borderRadius: 5,
                  marginLeft: 5,
                }}
              />
            </div>
            <div style={{marginTop:30}}>
              <table className="store_table">
                <thead>
                  <tr className="row-style">
                    <th variant="head">Couriers</th>
                    <th variant="head">Vehicle ID</th>
                    <th variant="head">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {courier?.map((item) => {
                    if (item.store.title === store.title) {
                      return (
                        <tr className="row-style" key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.licensePlate}</td>
                          <td>{item.email} </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditStore;
