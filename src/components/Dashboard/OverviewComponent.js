import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Parse from "parse/dist/parse.min.js";
import * as React from "react";
import { useEffect, useState } from "react";
import MedicineCard from "../OrderMedicine/MedicineCard";
import Orders from "./Orders";
import Title from "./Title";

export function OverviewComponent({
  handleCartDetails,
  setPageType,
  cartDetails: medicines,
}) {
  const [Medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMedicinesData = async function () {
      const parseQuery = new Parse.Query("Medicines");
      parseQuery.limit(4);
      try {
        const medicines = await parseQuery.find();
        setMedicines(medicines);
      } catch (error) {
        alert(`Error! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getMedicinesData();
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
            Medicines.map((medicine, index) => {
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
                      handleCartDetails={handleCartDetails}
                      medicine={medicine}
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
