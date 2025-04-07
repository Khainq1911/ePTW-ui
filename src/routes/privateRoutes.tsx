import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAthenticated } from "../components/hooks/useAuth";
import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";

const PrivateRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
  return isAthenticated() ? (
    <div>
      <Header />
      <div className="mt-[70px]">
        <Sidebar />
        <div className="p-5">{children}</div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
