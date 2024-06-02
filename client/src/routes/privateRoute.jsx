import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { userContext } from "../context/userContext";

function PrivateRoute() {
  const { user, setIsLoginOpen } = useContext(userContext);
  if (user) {
    return (
      <Outlet />
    )
  } else {
    setIsLoginOpen(true)
    return (
      <Navigate to={'/'} />
    )
  }
}

export default PrivateRoute;