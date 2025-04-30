import { routeConfig } from '../configs/router.config';
import Home from '../pages/home';
import Login from '../pages/auth';
import Permit from '../pages/permits';
import UpdateTemplate from '../pages/updateTemplate';
import AddPermit from '../pages/addPermit';
import CreateTemplateV2 from '../pages/addTemplate';
import ViewPermitPage from '../pages/viewPermitPage';
import RevisePermit from '../pages/revisePermit';
import Dashboard from '../pages/dashboard';

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
    { path: routeConfig.detailPermit, component: ViewPermitPage },
    { path: routeConfig.revisePermit, component: RevisePermit },
    { path: routeConfig.dashboard, component: Dashboard },
];

const adminRoutes = [];
export { publicRoutes, privateRoutes, adminRoutes };
