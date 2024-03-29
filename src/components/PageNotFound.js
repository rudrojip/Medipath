import React from "react";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import { Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h3">PageNotFound</Typography>
      <WrongLocationIcon
        color="error"
        fontSize="large"
        sx={{
          height: "5em",
          width: "5em",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default PageNotFound;
