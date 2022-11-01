import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField } from "formik-material-ui";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAuth } from "../AuthContextProvider";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";

export default function SignIn() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) errors.email = "Required";

        if (!values.password) errors.password = "Required";
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const userData = await signin(values);
        setSubmitting(false);
        userData !== null && navigate("/dashboard");
      }}
    >
      {({ submitForm, isSubmitting, values, setFieldValues }) => (
        <Form>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "slategray" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Field
                  component={TextField}
                  type="text"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  name="email"
                />
                <Field
                  component={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid container xs={12} alignItems={"flex-start"}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={submitForm}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
