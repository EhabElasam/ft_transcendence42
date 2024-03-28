
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, isLoggedIn, ...rest }) => {
  return isLoggedIn ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
