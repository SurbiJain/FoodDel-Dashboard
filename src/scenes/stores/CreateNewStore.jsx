import React from "react";
import { useFormik } from "formik";
import axios from "../../hooks/axios";
import { Link } from "react-router-dom";
import map from "./images/map.png";


const CreateNewStore = () => {
  const formik = useFormik({
    initialValues: {
      status: "",
      gsm: "",
      address: "",
      email: "",
      title: "",
    },
    onSubmit: (values) => {
      console.log(values);

      axios.post("/stores", {
        address: { text: values.address },
        title: values.title,
        gsm: values.gsm,
        isActive: values.status,
        email: values.email,
      });
    },
  });
  return (
    <div className="mainContainer">
      <div>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
        />
        <div className="storeContainer">
          <div className="storeTable">
            <table className="store_table">
              <tbody>
                <tr className="row-style">
                  <th variant="head">Status</th>
                  <td>
                    <>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Open"
                          onChange={formik.handleChange}
                        />
                        Open
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Closed"
                          onChange={formik.handleChange}
                        />
                        Closed
                      </label>
                    </>
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Email</th>

                  <td>
                    <input
                      className="input"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
                <tr className="row-style">
                  <th variant="head">Address</th>
                  <td>
                    <input
                      className="input"
                      name="address"
                      type="text"
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
                <tr className="row-style" style={{ borderBottom: "none" }}>
                  <th variant="head">Phone</th>
                  <td style={{ borderBottom: "none !important" }}>
                    <input
                      className="input"
                      type="text"
                      name="gsm"
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn btn2">
              <button
                className="save"
                onClick={formik.handleSubmit}
                type="submit"
              >
                {" "}
                Save
              </button>
              <Link to="../stores">
                <button className="cancel"> Cancel </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="map">
          <img className="mapImage" src={map} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewStore;
