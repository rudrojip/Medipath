import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField } from "formik-material-ui";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContextProvider";
import { Formik, Form, Field} from "formik"
import { CheckBox } from "@mui/icons-material";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = await signup(data);
    userData !== null && navigate("/dashboard");
  };

  return (
    <Formik enableReinitialize={true}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: ""
      }}
      validate= { values => {
        const errors = {};
        if(!values.firstName)
        errors.firstName = "Required";

        if(!values.lastName)
        errors.lastName = "Required";

        if(!values.email)
        errors.email = "Required";

        if(!values.userName)
        errors.userName = "Required";

        if(!values.password)
        errors.password = "Required";

        return errors;
      }}
      onSubmit={async (values, {setSubmitting, resetForm}) => {
          handleSubmit();
      }
    }
    >
      {({ submitForm, isSubmitting, values, setFieldValues}) => (
        <>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component = {TextField}
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component = {TextField}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"                      
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component = {TextField}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"            
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component = {TextField}
                      fullWidth
                      id="userName"
                      label="UserName"
                      name="userName"            
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component = {TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"              
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color= {"primary"}/>}
                      label="Accept our terms & conditions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={submitForm}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </Formik>
  );
}
