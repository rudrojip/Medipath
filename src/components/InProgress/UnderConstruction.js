import React from "react";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Typography } from "@mui/material";

const UnderConstruction = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h3" >Under Construction</Typography>
      <ConstructionIcon
        color="warning"
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

export default UnderConstruction;
