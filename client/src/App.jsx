import Admin from "../components/Admin/Admin";

import { Routes, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AdminHome from "../components/Admin/AdminHome";
import AdminAddApp from "../components/Admin/AdminAddApp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminHome />} />
        <Route path="add" element={<AdminAddApp />} />
      </Route>
    </Routes>
  );
}

export default App;
