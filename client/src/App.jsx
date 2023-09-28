import Admin from "../src/components/Admin/Admin";

import { Routes, Route } from "react-router-dom";

import Login from "../src/components/Login/Login";
import Register from "../src/components/Register/Register";
import AdminHome from "../src/components/Admin/AdminHome";
import AdminAddApp from "../src/components/Admin/AdminAddApp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login name={"User"} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<Login name={"Admin"} />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminHome />} />
        <Route path="add" element={<AdminAddApp />} />
      </Route>
    </Routes>
  );
}

export default App;
