import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useProductsContext } from "../ProductsContextProvider";
import React, { useEffect, useRef, useState } from "react";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  const { products, getCartData } = useProductsContext();
  const [productsList, setProductsList] = useState([]);
  const totalAmount = useRef(0);

  useEffect(() => {
    totalAmount.current = 0;
    const cartItems = getCartData();
    const products = cartItems.map((item) => {
      totalAmount.current += Number(item.price.slice(1)) * item.sellCount;
      return {
        name: item.name,
        desc: item.description,
        price: item.price,
        quantity: item.sellCount,
      };
    });
    setProductsList(products);

    return () => {
      totalAmount.current = 0;
    };
  }, [products, getCartData]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {productsList.map((product, index) => {
          if (index === 0) {
            totalAmount.current = 0;
          }
          const total = Number(product.price.slice(1)) * product.quantity;
          totalAmount.current = Number(totalAmount.current) + total;
          return (
            <ListItem key={index} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant="body2">{`${product.price} x ${product.quantity}`}</Typography>
            </ListItem>
          );
        })}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {Number(totalAmount.current.valueOf()).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
