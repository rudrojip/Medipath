import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Field}  from "formik";
import {TextField} from "formik-material-ui"
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PaymentForm() {
  return (
    <>
    <Typography variant="h6" gutterBottom>
      Payment method
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
      <Field
          component={TextField}
          id="cardName"
          name="cardName"
          label="card Name"
          fullWidth
          autoComplete="cc-name"
          variant="standard"
          type="text"
        />
      </Grid>
      <Grid item xs={12} md={6}>
      <Field
          component={TextField}
          id="cardNumber"
          name="cardNumber"
          label="Card number"
          fullWidth
          autoComplete="cc-number"
          variant="standard"
          type="text"
        />
      </Grid>
      <Grid item xs={12} md={6}>
      <Field
          component={TextField}
          id="expDate"
          name="expDate"
          label="Expiry date"
          fullWidth
          autoComplete="cc-exp"
          variant="standard"
          type="text"
        />
      </Grid>
      <Grid item xs={12} md={6}>
      <Field
          component={TextField}
          id="cvv"
          name="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
          variant="standard"
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveCard" value="yes" />}
          label="Remember credit card details for next time"
        />
      </Grid>
    </Grid>
  </>
  );
}
