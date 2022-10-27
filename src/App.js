import "./App.css";
import React, { Suspense, lazy } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import NavBar from "./components/NavBar";

const SignIn = lazy(() => import("./components/SignInSide"));
const SignUp = lazy(() => import("./components/SignUp"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));

const App = () => (
  <>
    <CssBaseline />
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  </>
);

export default App;
