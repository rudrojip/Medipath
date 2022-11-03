import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Button, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useEffect, useRef, useState } from "react";
import EmptyCart from "./EmptyCart";
import { useProductsContext } from "../ProductsContextProvider";

export default function ShoppingCart({ setPageType, handleCartDetails }) {
  const { products, getCartData } = useProductsContext();
  const [cartData, setCartData] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(false);
  const totalAmount = useRef(0);

  useEffect(() => {
    totalAmount.current = 0;
    const cartDetails = getCartData();
    setCartData(cartDetails);
    return () => {
      totalAmount.current = 0;
    };
  }, [products, getCartData]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {cartData.length ? (
          <>
            {cartData.map((cartItem, index) => {
              if (index === 0) {
                totalAmount.current = 0;
              }
              const total =
                Number(cartItem.price.slice(1)) * cartItem.cartCount;
              totalAmount.current = Number(totalAmount.current) + total;

              return (
                <>
                  <ListItem
                    key={index}
                    sx={{ width: "100%" }}
                    alignItems="flex-start"
                  >
                    <Card
                      key={index}
                      sx={{
                        width: "60%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={cartItem.image}
                        alt={cartItem.name}
                      />

                      <Box
                        key={cartItem.id}
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h5">
                            {cartItem.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {cartItem.description}
                          </Typography>
                        </CardContent>
                        <Box
                          key={cartItem.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        >
                          <IconButton
                            aria-label="add-item"
                            disabled={cartItem.cartCount === cartItem.stock}
                            onClick={() => handleCartDetails("add", cartItem)}
                          >
                            <AddIcon />
                          </IconButton>
                          {cartItem.cartCount}
                          <IconButton
                            aria-label="remove-item"
                            onClick={() =>
                              handleCartDetails("remove", cartItem)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Box
                            key={cartItem.id}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
                            <Typography variant="h6">{`Price: ₹${Number(
                              Number(cartItem.price.slice(1)) *
                                cartItem.cartCount
                            ).toFixed(2)}`}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </ListItem>
                </>
              );
            })}
            <Typography
              sx={{
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
              }}
              color="text.secondary"
              variant="h6"
              component="h2"
            >
              {`Total bill amount - ₹${Number(
                totalAmount.current.valueOf()
              ).toFixed(2)}`}
            </Typography>
          </>
        ) : (
          <EmptyCart handleCartDetails={handleCartDetails} />
        )}
      </List>
      {cartData.length !== 0 && (
        <Paper
          sx={{
            display: "flex",
            p: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" alignItems="right" spacing={2}>
            <Button
              sx={{ maxWidth: "25rem" }}
              variant="contained"
              disabled={
                cartData.find((item) => item.isPrescriptionRequired) === -1 ||
                !uploadedImage
              }
              onClick={() => setPageType("checkout")}
            >
              Proceed to checkout
            </Button>
            {cartData.find((item) => item.isPrescriptionRequired) && (
              <Button
                variant="contained"
                component="label"
                onClick={(e) => e.target.value && setUploadedImage(true)}
              >
                Upload Prescription
                <input hidden accept="image/*" type="file" />
              </Button>
            )}
          </Stack>
        </Paper>
      )}
    </div>
  );
}
