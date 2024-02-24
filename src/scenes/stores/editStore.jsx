import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../hooks/axios";
import { Link } from "react-router-dom";

const EditStore = () => {
  const [store, setStore] = useState();
  // let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = `/stores`;
  //   navigate(path);
  // };

  
  useEffect(() => {
    axios.get("/stores").then(function (response) {
      setStore(response.data);
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
      <Link to="./../..">
        <button style={{margin:30, height: 30, width: 100, border:1, borderRadius: 5}}>Stores</button>
        </Link>
      </div>
      <hr style={{borderColor: "#5c5c5c",
    width: "95%", margin: 20}} />
      <div>
        <p>hey</p>
      </div>
    </div>
  );
};

export default EditStore;
