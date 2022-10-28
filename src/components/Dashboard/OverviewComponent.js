import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Orders from "./Orders";
import MedicineCard from "../OrderMedicine/MedicineCard";

export function OverviewComponent() {
  return (
    <Grid container spacing={3}>
      {[1, 2, 3, 4].map((highlight) => {
        return (
          <Grid item xs={12} md={4} lg={3} key={highlight}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <MedicineCard />
            </Paper>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}
