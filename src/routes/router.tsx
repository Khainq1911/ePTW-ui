import { routeConfig } from '../configs/router.config';
import Home from '../pages/templates';
import Login from '../pages/auth';
import Permit from '../pages/permits';
import UpdateTemplate from '../pages/updateTemplate';
import AddPermit from '../pages/add-permit';
import CreateTemplateV2 from '../pages/add-template';
import ViewPermitPage from '../pages/viewPermitPage';
import RevisePermit from '../pages/revisePermit';
import Dashboard from '../pages/dashboard';
import ViewTemplate from '../pages/view-template';

const publicRoutes = [
    { path: routeConfig.login, component: Login },
    { path: routeConfig.signUp, component: Login },
];

const privateRoutes = [
    { path: routeConfig.template, component: Home },
    { path: routeConfig.permit, component: Permit },
    { path: routeConfig.addTemplate, component: CreateTemplateV2 },
    { path: routeConfig.updateTemplate, component: UpdateTemplate },
    { path: routeConfig.addPermit, component: AddPermit },
    { path: routeConfig.detailPermit, component: ViewPermitPage },
    { path: routeConfig.revisePermit, component: RevisePermit },
    { path: routeConfig.dashboard, component: Dashboard },
    { path: routeConfig.viewTemplate, component: ViewTemplate },
];

const adminRoutes = [];
export { publicRoutes, privateRoutes, adminRoutes };
