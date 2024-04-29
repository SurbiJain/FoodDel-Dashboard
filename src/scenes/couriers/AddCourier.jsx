import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { InputLabel, MenuItem, Select } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import { OutlinedInput } from "@mui/material";
import axios from "./../../hooks/axios";



const AddCourier = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [newCourier, setNewCourier] = useState(false);
  const handleOpen = () => {
    return (
      setOpen(true),
      setStep(1),
      setNewCourier(true),
      formik.setValues({
        name: "",
        email: "",
        GSM: "",
        Address: "",
        store: "",
        AccountNumber: "",
        Vehicle: "",
        VehicleId: "",
      })
    );
  };
  const handleClose = () => {
    return setOpen(false), setStep(1), setNewCourier(false);
  };
  const [store, setStore] = useState();
  const [vehicleId, setVehicleId] = useState();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      GSM: "",
      Address: "",
      store: "",
      AccountNumber: "",
      Vehicle: "",
      VehicleId: "",
    },

    onSubmit: (values) => {
      console.log(values);
      setOpen(false);
      setStep(1);
    },
  });

  useEffect(() => {
    axios.get("/stores").then((res) => {
      setStore(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/vehicles").then((res) => {
      setVehicleId(res.data);
    });
  }, []);

  return (
    <>
     <div >
        <button className="createCourier"  onClick={handleOpen}>
          Add Courier
        </button>
        </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Add New Courier</DialogTitle>

        {step === 1 && (
          <DialogContent>
            <Box className="addCourier">
              <InputLabel>Name</InputLabel>
              <ListItem disablePadding>
                <OutlinedInput
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Name"
                  fullWidth={true}
                  required
                />
              </ListItem>
              <InputLabel>Email</InputLabel>
              <ListItem disablePadding>
                <OutlinedInput
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                  fullWidth={true}
                  required
                />
              </ListItem>
              <InputLabel>GSM</InputLabel>
              <ListItem disablePadding>
                <OutlinedInput
                  name="GSM"
                  onChange={formik.handleChange}
                  value={formik.values.GSM}
                  placeholder="PH No."
                  fullWidth={true}
                  required
                />
              </ListItem>
              <InputLabel>Address</InputLabel>
              <ListItem disablePadding>
                <OutlinedInput
                  name="Address"
                  onChange={formik.handleChange}
                  value={formik.values.Address}
                  placeholder="Address"
                  fullWidth={true}
                  required
                />
              </ListItem>
            </Box>
          </DialogContent>
        )}

        {step === 3 && (
          <DialogContent>
            <Box>
              <InputLabel>Vehicle</InputLabel>
              <select
                required
                label="Vehicle"
                onChange={formik.handleChange}
                name="Vehicle"
                style={{
                  height: 50,
                  backgroundColor: "inherit",
                  color: "#9d9a9a",
                  paddingLeft: 12.5,
                }}
              >
                <option value="" hidden>
                  {formik.values.Vehicle ? formik.values.Vehicle : "Vehicle"}
                </option>

                {vehicleId &&
                  vehicleId.map((e) => {
                    return (
                      <option value={e.model} key={e.id}>
                        {e.model}
                      </option>
                    );
                  })}
              </select>

              <InputLabel>Vehicle Id</InputLabel>
              <ListItem disablePadding>
                <OutlinedInput
                  name="VehicleId"
                  onChange={formik.handleChange}
                  value={formik.values.VehicleId}
                  fullWidth={true}
                  placeholder="Vehicle Id"
                  required
                />
              </ListItem>
            </Box>
          </DialogContent>
        )}
        {step === 2 && (
          <DialogContent>
            <Box>
              <InputLabel>Store</InputLabel>
              <ListItem disablePadding>
                <select
                  required
                  label="Store"
                  onChange={formik.handleChange}
                  name="store"
                  style={{
                    height: 50,
                    backgroundColor: "inherit",
                    color: "#9d9a9a",
                    paddingLeft: 12.5,
                  }}
                >
                  <option value="" hidden>
                    {formik.values.store ? formik.values.store : "Store"}
                  </option>
                  {store &&
                    store.map((e) => {
                      return (
                        <option value={e.title} key={e.id}>
                          {e.title}
                        </option>
                      );
                    })}
                </select>
              </ListItem>
              <InputLabel>Account No.</InputLabel>
              <ListItem disablePadding>
                <OutlinedInput
                  name="AccountNumber"
                  onChange={formik.handleChange}
                  value={formik.values.AccountNumber}
                  placeholder="Account No."
                  fullWidth={true}
                  required
                />
              </ListItem>
            </Box>
          </DialogContent>
        )}

        <div className="d-flex justify-content-between">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <>
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default AddCourier;
