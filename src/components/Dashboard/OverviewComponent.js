import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Parse from "parse/dist/parse.min.js";
import * as React from "react";
import { useEffect, useState } from "react";
import MedicineCard from "../OrderMedicine/MedicineCard";
import { useProductsContext } from "../ProductsContextProvider";
import Orders from "./Orders";
import Title from "./Title";

export function OverviewComponent({ handleCartDetails, setPageType }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getSuggestedProducts } = useProductsContext();

  useEffect(() => {
    async function getSuggestedProductsList() {
      const suggestedProducts = await getSuggestedProducts();
      setProducts(suggestedProducts);
      setLoading(false);
    }
    getSuggestedProductsList();
    return () => {};
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Title>{`Suggested for you & popular products`}</Title>
          {loading ? (
            <CircularProgress />
          ) : (
            products.map((product, index) => {
              return (
                <Grid item xs={12} md={4} lg={3} key={index}>
                  <Paper
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      height: 300,
                    }}
                  >
                    <MedicineCard
                      key={index}
                      product={product}
                      handleCartDetails={handleCartDetails}
                    />
                  </Paper>
                </Grid>
              );
            })
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Orders setPageType={setPageType} />
        </Paper>
      </Grid>
    </Grid>
  );
}
