import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../../hooks/axios";

const CreateStore = () => {
  const [store, setStore] = useState();
  const storeId = useParams().storeId;
  console.log(storeId);

  useEffect(() => {
    axios.get(`/stores/${storeId}`).then(function (response) {
      setStore(response.data);
    });
  }, []);

  return (
    store && (
      <>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            columnGap: 2,
            margin: 5,
          }}
        >
          <Box display="flex" sx={{ marginTop: 1 }}>
            <h3>Title</h3>
            <Typography variant="h10">{store?.title}</Typography>
          </Box>
          <Box display="flex" sx={{ marginTop: 1 }}>
            <h3>Phone Number</h3>
            <Typography variant="h10">{store?.gsm}</Typography>
          </Box>
        </Box>
      </>
    )
  );
};

export default CreateStore;
