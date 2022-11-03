import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Title from "../Dashboard/Title";
import MedicineCard from "../OrderMedicine/MedicineCard";
import { useProductsContext } from "../ProductsContextProvider";

const EmptyCart = ({ handleCartDetails }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRecentProduct, setIsRecentProduct] = useState(true);
  const { getRecentlyOrderedProducts, getSuggestedProducts } =
    useProductsContext();

  useEffect(() => {
    async function getRecentlyOrderedProductsList() {
      const recentlyOrdered = await getRecentlyOrderedProducts();
      if (recentlyOrdered.length === 0) {
        const suggestedProducts = await getSuggestedProducts();
        setIsRecentProduct(() => false);
        setProducts(suggestedProducts);
        setLoading(false);
      } else {
        setIsRecentProduct(() => true);
        setProducts(recentlyOrdered);
        setLoading(false);
      }
    }

    getRecentlyOrderedProductsList();
    return () => {};
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Title>
                {isRecentProduct
                  ? `Recently ordered products by customers`
                  : `Suggested for you & popular products`}
              </Title>
              {products.map((product, index) => {
                return (
                  <Paper
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <MedicineCard
                      key={index}
                      product={product}
                      handleCartDetails={handleCartDetails}
                      isRecentProduct={isRecentProduct}
                      displayPrescription={true}
                    />
                  </Paper>
                );
              })}
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmptyCart;
