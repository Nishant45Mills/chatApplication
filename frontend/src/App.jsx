import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/Auth/Login.jsx";
import Register from "./features/Auth/Register.jsx";
import Dashboard from "./features/Dashboard/Dashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
