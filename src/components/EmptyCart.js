import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";

const EmptyCart = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h3">Your Cart is Empty</Typography>
      <ShoppingCartIcon
        color="warning"
        fontSize="large"
        sx={{
          height: "3em",
          width: "3em",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default EmptyCart;
