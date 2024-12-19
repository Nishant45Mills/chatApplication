import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth0();
  console.log("hey!!");

  return (
    <>
      <NavLink to="/register">
        logout
      </NavLink>
    </>
  );
}

export default Dashboard;
