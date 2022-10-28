import React, { useContext, useEffect, useState } from "react";

import Parse from "parse/dist/parse.min.js";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function retriveUser() {
      const currentUser = await Parse.User.current();
      setCurrentUser(currentUser);
      setLoading(false);
    }
    retriveUser();
  }, []);

  async function signup(userDetails) {
    const user = new Parse.User();
    user.set("firstName", userDetails.get("lastName"));
    user.set("lastName", userDetails.get("firstName"));
    user.set("email", userDetails.get("email"));
    user.set("username", userDetails.get("userName"));
    user.set("password", userDetails.get("password"));
    const createdUser = await user.signUp();
    setCurrentUser(createdUser);
  }

  async function signin(userDetails) {
    try {
      const loggedInUser = await Parse.User.logIn(
        userDetails.get("email"),
        userDetails.get("password")
      );
      setCurrentUser(loggedInUser);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const value = {
    currentUser,
    signup,
    signin,
    error,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
