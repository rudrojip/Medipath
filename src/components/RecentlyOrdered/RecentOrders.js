import { Toolbar, Typography, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useProductsContext } from "../ProductsContextProvider";
import Title from "../Dashboard/Title";

const RecentOrders = () => {
  const { getRecentOrdersForUser } = useProductsContext();
  const [recentOrders, setRecentOrders] = React.useState([]);

  React.useEffect(() => {
    async function getRecentOrdersList() {
      const recentOrdersList = await getRecentOrdersForUser();
      setRecentOrders(recentOrdersList);
    }
    getRecentOrdersList();
    return () => {};
  }, []);
  return (
  <React.Fragment>
      {
      recentOrders.length ? 
        <>
        <Grid container direction="row">
        <Title>  Recent Orders</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.items}</TableCell>
                  <TableCell>{row.deliveryAddress}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`₹${row.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Grid>
        </>
       : 
        <Typography variant="h3">No Transactions</Typography>
      }
    </React.Fragment>
)};

export default RecentOrders;
