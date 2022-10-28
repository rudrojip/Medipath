import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Parse from "parse/dist/parse.min.js";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/AuthContextProvider";
import PageNotFound from "./components/PageNotFound";
import { PersonComponent } from "./components/PersonComponent/PersonComponent";
import PrivateRoute from "./components/PrivateRoute";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "xze8hnBUgSyo7wTlZH2sMHb9enog633AIyFAOtmk";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "gdTtObpw04SDcWD8juqOWCs4IrzpXED5CTn1VpyW";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));

const App = () => (
  <>
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
            <Route exact path="/person" element={<PrivateRoute />}>
              <Route path="/person" element={<PersonComponent />} />
            </Route>
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthContextProvider>
      </Suspense>
    </Router>
  </>
);

export default App;
