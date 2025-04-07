import { routeConfig } from "../configs/router.config";
import Home from "../pages/home";
import Login from "../pages/auth";
import Permit from "../pages/permits";
import AddTemplate from "../pages/addTemplate";
import UpdateTemplate from "../pages/updateTemplate";

const publicRoutes = [
  { path: routeConfig.login, component: Login },
  { path: routeConfig.signUp, component: Login },
];

const privateRoutes = [
  { path: routeConfig.home, component: Home },
  { path: routeConfig.permit, component: Permit },
  { path: routeConfig.addTemplate, component: AddTemplate },
  { path: routeConfig.updateTemplate, component: UpdateTemplate },
];

const adminRoutes = [];
export { publicRoutes, privateRoutes, adminRoutes };
