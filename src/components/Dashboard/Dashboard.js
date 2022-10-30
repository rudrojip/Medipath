import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useAuth } from "../AuthContextProvider.js";
import Checkout from "../Checkout/Checkout.js";
import OrderMedicine from "../OrderMedicine/OrderMedicine";
import { useProductsContext } from "../ProductsContextProvider.js";
import RecentOrders from "../RecentOrders.js";
import ShoppingCart from "../ShoppingCart.js";
import UnderConstruction from "../UnderConstruction.js";
import "./Dashboard.css";
import { mainListItems } from "./listItems.js";
import { OverviewComponent } from "./OverviewComponent";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const [pageType, setPageType] = useState("overview");
  const [cartBadge, setCartBadge] = useState(0);
  const { signout } = useAuth();
  const { handleProductCartActions } = useProductsContext();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    await signout();
  };

  const handleCartDetails = React.useCallback((action, productInfo = null) => {
    if (productInfo) {
      switch (action) {
        case "add":
          setCartBadge((prevState) => prevState + 1);
          handleProductCartActions(action, productInfo);
          return;
        case "remove":
          if (productInfo.sellCount > 0) {
            setCartBadge((prevState) => prevState - 1);
            handleProductCartActions(action, productInfo);
          }
          return;
        default:
          return;
      }
    }
  }, [handleProductCartActions]);

  const getComponentToRender = (pageType) => {
    switch (pageType) {
      case "orderMedicines":
        return <OrderMedicine handleCartDetails={handleCartDetails} />;
      case "doctorAppointment":
      case "labAppointment":
        return <UnderConstruction />;
      case "recentOrders":
        return <RecentOrders />;
      case "shoppingcart":
        return <ShoppingCart setPageType={setPageType} />;
      case "checkout":
        return <Checkout />;
      default:
        return (
          <OverviewComponent
            handleCartDetails={handleCartDetails}
            setPageType={setPageType}
          />
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Medipath Dashboard
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => {
              setPageType("shoppingcart");
            }}
          >
            <Badge badgeContent={cartBadge} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleSignOut}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{mainListItems(setPageType)}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          style={{ display: "flex", gap: "2em" }}
          className={pageType}
          maxWidth="lg"
          sx={{ mt: 4, mb: 4 }}
        >
          {getComponentToRender(pageType)}
        </Container>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
