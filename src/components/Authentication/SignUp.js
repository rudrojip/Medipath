import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import {regex, global} from "../../config"

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const errorCheck = await validateFunction(data);
    if(Object.keys(errorCheck).length === 0) {
      const userData = await signup(data);
      userData !== null && navigate("/dashboard");
    }
  };

  const validateFunction = async (values) => {
    const errors = {}

    if(!values.get("firstName")) {
      errors.firstName = "Required"
    }
    else if(!regex.Alphabets.test(values.get("firstName"))) {
      errors.firstName = "Invalid Name"
    }

    if(!values.get("lastName")) {
      errors.lastName = "Required"
    }
    else if(!regex.Alphabets.test(values.get("lastName"))) {
      errors.lastName = "Invalid Name"
    }

    if(!values.get("email")) {
      errors.email = "Required"
    }
    else if(!regex.Mail.test(values.get("email"))) {
      errors.email = "Invalid email"
    }

    if(!values.get("userName")) {
      errors.userName = "Required"
    }
    else if(!regex.userName.test(values.get("userName"))) {
      errors.userName = "Invalid user name"
    }

    if(!values.get("password")) {
      errors.password = "Required"
    }
    setErrors(errors);
    return errors
  };

  return (
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error = {!!errors?.firstName}
                helperText={errors?.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error = {!!errors?.lastName}
                helperText={errors?.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error = {!!errors?.email}
                helperText={errors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userName"
                label="UserName"
                name="userName"
                autoComplete="userName"
                error = {!!errors?.userName}
                helperText={errors?.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error = {!!errors?.password}
                helperText={errors?.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="termscheck" value="allowExtraEmails" color="primary" />}
                label="Accept our terms & conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
  );
}
