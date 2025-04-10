import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../hooks/useAuth";
import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";

const PrivateRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
  return isAuthenticated() ? (
    <div>
      <Header />
      <div className="mt-[70px]">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
