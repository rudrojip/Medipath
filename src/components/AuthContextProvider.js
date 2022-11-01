import React, { useContext, useEffect, useState } from "react";

import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function retriveUser() {
      const currentUser = await Parse.User.current();
      setCurrentUser(currentUser);
      setLoading(false);
      currentUser !== null && navigate("/dashboard");
    }
    retriveUser();
    return () => {};
  }, []);

  async function signup(userDetails) {
    try {
      const user = new Parse.User();
      user.set("firstName", userDetails.get("lastName"));
      user.set("lastName", userDetails.get("firstName"));
      user.set("email", userDetails.get("email"));
      user.set("username", userDetails.get("userName"));
      user.set("password", userDetails.get("password"));
      const createdUser = await user.signUp();
      setCurrentUser(createdUser);
      return createdUser;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signin(userDetails) {
    try {
      const loggedInUser = await Parse.User.logIn(
        userDetails.email,
        userDetails.password
      );
      setCurrentUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function signout() {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    error,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
