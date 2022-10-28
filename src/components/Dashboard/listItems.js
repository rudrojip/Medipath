import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

export const mainListItems = (setPageType) => {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => setPageType("overview")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => setPageType("orderMedicines")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Order medicines" />
      </ListItemButton>
      <ListItemButton onClick={() => setPageType("doctorAppointment")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Doctor's appointment" />
      </ListItemButton>
      <ListItemButton onClick={() => setPageType("labAppointment")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Lab appointment" />
      </ListItemButton>
      <ListItemButton onClick={() => setPageType("recentOrders")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Recent orders" />
      </ListItemButton>
    </React.Fragment>
  );
};
