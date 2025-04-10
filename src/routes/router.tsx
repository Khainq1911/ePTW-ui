import { routeConfig } from "../configs/router.config";
import Home from "../pages/home";
import Login from "../pages/auth";
import Permit from "../pages/permits";
import UpdateTemplate from "../pages/updateTemplate";
import AddPermit from "../pages/addPermit";
import CreateTemplateV2 from "../pages/addTemplate";

const publicRoutes = [
  { path: routeConfig.login, component: Login },
  { path: routeConfig.signUp, component: Login },
];

const privateRoutes = [
  { path: routeConfig.home, component: Home },
  { path: routeConfig.permit, component: Permit },
  { path: routeConfig.addTemplate, component: CreateTemplateV2 },
  { path: routeConfig.updateTemplate, component: UpdateTemplate },
  { path: routeConfig.addPermit, component: AddPermit },
];

const adminRoutes = [];
export { publicRoutes, privateRoutes, adminRoutes };
