import { Routes, Route } from "react-router-dom";

import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Preview } from "../pages/Preview";
import { Create } from "../pages/Create";




export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="/register" element={<SingUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/create" element={<Create/>} />
    </Routes>
  );
}
