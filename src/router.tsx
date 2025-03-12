import { routeConfig } from "./configs/router.config";
import Home from "./pages/home";
import Login from "./pages/auth";

const publicRoutes = [
  { path: routeConfig.login, component: Login },
  { path: routeConfig.signUp, component: Login },
];

const privateRoutes = [{ path: routeConfig.home, component: Home }];

const adminRoutes = [];
export { publicRoutes, privateRoutes, adminRoutes };
