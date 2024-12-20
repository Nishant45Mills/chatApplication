import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <NavLink
        onClick={logOut}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        logout
      </NavLink>
    </>
  );
}

export default Dashboard;
