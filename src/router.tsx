import { routeConfig } from "./configs/router.config";
import Home from "./pages/home";
import Login from "./pages/auth";

const publicRoutes = [
  { path: routeConfig.home, component: Home },
  { path: routeConfig.login, component: Login },
  { path: routeConfig.signUp, component: Login },
];

export { publicRoutes };
