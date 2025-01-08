const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const chatRoute = require("./chat.route");
const messageRoute = require("./message.route");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/chat",
    route: chatRoute,
  },
  {
    path:"/message",
    route:messageRoute
  }
];
defaultRoutes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
