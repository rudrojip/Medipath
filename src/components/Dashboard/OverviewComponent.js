import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Parse from "parse/dist/parse.min.js";
import * as React from "react";
import { useEffect, useState } from "react";
import MedicineCard from "../OrderMedicine/MedicineCard";
import Orders from "./Orders";
import Title from "./Title";

export function OverviewComponent({ handleCartDetails, setPageType }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMedicinesData = async function () {
      const parseQuery = new Parse.Query("Medicines");
      parseQuery.limit(4);
      try {
        const suggestedProducts = await parseQuery.find();
        const products = suggestedProducts.map((suggestedProduct) => {
          const medicineName = suggestedProduct.get("Name");
          const name =
            medicineName.charAt(0).toUpperCase() +
            medicineName.slice(1).toLowerCase();

          const description = suggestedProduct.get("Description");
          const rating = suggestedProduct.get("Rating");
          const stock = suggestedProduct.get("Stock");
          const image = suggestedProduct.get("Image");
          const price = suggestedProduct.get("Price");
          const sellCount = suggestedProduct.get("SellCount") || 0;

          return {
            id: suggestedProduct.id,
            name: name,
            description: description,
            rating: rating,
            stock: stock,
            image: image,
            price: price,
            sellCount: sellCount,
          };
        });
        setProducts(products);
      } catch (error) {
        alert(`Error! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getMedicinesData();
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
          <Title>Suggested for you</Title>
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
