import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Orders from "./Orders";
import MedicineCard from "../OrderMedicine/MedicineCard";
import Title from "./Title";

export function OverviewComponent() {
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
          <Title>Recently Viewed</Title>
          {[1, 2, 3, 4].map((highlight) => {
            return (
              <Grid item xs={12} md={4} lg={3} key={highlight}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: 270,
                  }}
                >
                  <MedicineCard />
                </Paper>
              </Grid>
            );
          })}
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
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}
