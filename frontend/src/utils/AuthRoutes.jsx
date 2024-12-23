import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  if (!JSON.parse(localStorage.getItem("token"))) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

function PublicRoute({ children }) {
  const navigate = useNavigate();

  if (JSON.parse(localStorage.getItem("token"))) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}

export { ProtectedRoute, PublicRoute };
