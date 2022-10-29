import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Parse from "parse/dist/parse.min.js";
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/AuthContextProvider";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import SwitchTheme from "./components/SwitchTheme";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));

const App = () => {
  const [mode, setMode] = useState("light");
  const toggleTheme = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <SwitchTheme toggleTheme={toggleTheme} />
        <CssBaseline />
        <Router>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            }
          >
            <AuthContextProvider>
              <Routes>
                <Route exact path="/" element={<SignIn />} />
                <Route exact path="/dashboard" element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route exact path="/signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </AuthContextProvider>
          </Suspense>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
