import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./components/context/AuthContext";

import AdminLogin from "./components/Admin/Login/AdminLogin";
import Admin from "../src/components/Admin/Admin";
import Login from "../src/components/Login/Login";
import Register from "../src/components/Register/Register";
import AdminHome from "../src/components/Admin/AdminHome";
import AdminAddApp from "../src/components/Admin/AdminAddApp";
import Home from "./components/User/Home";
import Profile from "./components/User/Profile";
import Points from "./components/User/Points";
import Tasks from "./components/User/Tasks";
import LandingPage from "./components/LandingPage";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login headName={"User Login"} />} />
      <Route
        path="/register"
        element={<Register headName={"User Registration"} />}
      />
      <Route path="/home" element={<Home />}>
        <Route path="profile" element={<Profile />} />
        <Route path="points" element={<Points />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>

      <Route
        path="/admin/login"
        element={<AdminLogin headName={"Admin Login"} />}
      />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminHome />} />
        <Route path="add" element={<AdminAddApp />} />
      </Route>
    </Routes>
  );
}

export default App;
