import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Create } from "../pages/Create";
import { Edit } from "../pages/Edit";
import { Preview } from "../pages/Preview";

import { NotFound } from "../pages/NotFound";

export function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
