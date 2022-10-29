import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Paper } from "@mui/material";

export default function ShoppingCart({ setPageType }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Typography variant="h4" >Your Shopping Cart</Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <>
              <ListItem sx={{ width: "100%" }} alignItems="flex-start">
                <Card
                  key={item}
                  sx={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="http://dummyimage.com/200x200.png/dddddd/000000"
                    alt="Live from space album cover"
                  />

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        Live From Space
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Mac Miller
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <IconButton aria-label="add-item">
                        <AddIcon />
                      </IconButton>
                      <IconButton disabled aria-label="cart-icon">
                        <ShoppingCartIcon sx={{ height: 30, width: 30 }} />
                      </IconButton>
                      <IconButton aria-label="remove-item">
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </ListItem>
            </>
          );
        })}
      </List>
      <Paper
        sx={{
          display: "flex",
          p: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ maxWidth: "25rem" }}
          variant="contained"
          onClick={() => setPageType("checkout")}
        >
          Proceed to checkout
        </Button>
      </Paper>
    </div>
  );
}
