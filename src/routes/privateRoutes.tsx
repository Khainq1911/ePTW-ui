import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../hooks/useAuth';
import Sidebar from '../components/layout/sidebar';
import { Divider, Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { sidebarContext } from '../context/sidebarContext';
const PrivateRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
    const context = useContext(sidebarContext);
    return isAuthenticated() ? (
        <div className="relative">
            <Fab
                onClick={context?.toggleSidebar}
                color="primary"
                sx={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '20px',
                    display: {
                        xs: 'block',
                        lg: 'none',
                    },
                }}
            >
                <MenuIcon />
            </Fab>
            <Sidebar />
            <div className="lg:ml-80 ">{children}</div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoutes;
