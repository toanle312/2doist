import React from "react";
import {  Navigate, Outlet } from "react-router-dom";
import { auth } from "src/firebase/config";

/**
 * This FC use to protect specific route
 */
const PrivateRoute = () => {
  return (
    auth.currentUser ? <Outlet/> : <Navigate to={"/"}/>
  )
};

export default PrivateRoute;
