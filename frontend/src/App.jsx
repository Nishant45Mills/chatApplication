import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/Auth/Login.jsx";
import Register from "./features/Auth/Register.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;