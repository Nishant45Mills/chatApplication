const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const userRoute = require("./user");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];
defaultRoutes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
