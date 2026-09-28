import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Subscriptions from "../pages/Subscriptions";
import AddSubscriptions from "../pages/AddSubscriptions";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Subscriptions" element={<Subscriptions />} />
        <Route path="/addSubscriptions" element={<AddSubscriptions/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
