const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionRoutes = require("./sessions.routes");


const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);

module.exports = routes;