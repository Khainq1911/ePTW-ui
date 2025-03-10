import { routeConfig } from "./configs/router.config";
import Home from "./pages/home";


const publicRoutes = [
    {path: routeConfig.home, component: Home}
]

export {publicRoutes}