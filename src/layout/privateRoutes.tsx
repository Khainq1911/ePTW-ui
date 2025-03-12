import { ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { isAthenticated } from "../hooks/useAuth";


const PrivateRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {

 
  return isAthenticated() ? <>{children}</> : <Navigate to="/login"/>
};

export default PrivateRoutes;
