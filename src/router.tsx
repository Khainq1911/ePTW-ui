import { routeConfig } from "./configs/router.config";
import Home from "./pages/home";
import Login from "./pages/auth";
import Permit from "./pages/permits";
import AddTemplate from "./pages/addTemplate";

const publicRoutes = [
  { path: routeConfig.login, component: Login },
  { path: routeConfig.signUp, component: Login },
];

const privateRoutes = [
  { path: routeConfig.home, component: Home },
  { path: routeConfig.permit, component: Permit },
  { path: routeConfig.addTemplate, component: AddTemplate },
];

const adminRoutes = [];
export { publicRoutes, privateRoutes, adminRoutes };
