import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ListItemIcon, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useContext, useEffect, useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useLocation, useNavigate } from 'react-router-dom';

import { sidebarContext } from '../../context/sidebarContext';
import { getUser } from '../../hooks/useAuth';
export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const context = useContext(sidebarContext);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    const location = useLocation();

    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const listItems = [
        { name: 'Templates', icon: <DescriptionIcon />, url: '/' },
        { name: 'Permits', icon: <AssignmentIcon />, url: '/permit' },
        { name: 'Dashboard', icon: <InsertChartIcon />, url: '/dashboard' },
    ];

    useEffect(() => {
        listItems.map((item, index) => {
            if (location.pathname.includes(item.url)) {
                return setValue(index);
            }
        });
    }, [location.pathname]);

    return (
        <div className="w-screen h-[70px] bg-[white] fixed top-0 left-0 px-5 border-b-1 border-[#D1D9E0] z-30">
            <div className="flex justify-between items-center h-full">
                <div className="block sm:hidden" onClick={context?.toggleSidebar}>
                    <MenuIcon fontSize="large" className="cursor-pointer text-[#000]" />
                </div>
                <div className="hidden sm:block">
                    <Tabs value={value} onChange={handleChange}>
                        {listItems.map((item, index) => (
                            <Tab
                                label={item.name}
                                value={index}
                                key={index}
                                icon={item.icon}
                                iconPosition="start"
                                onClick={() => navigate(item.url)}
                            />
                        ))}
                    </Tabs>
                </div>
                <div className="flex items-center gap-2">
                    <p className="font-medium">{getUser()?.name}</p>
                    <AccountCircleIcon fontSize="large" className="cursor-pointer text-[#000]" onClick={handleClick} />
                </div>
            </div>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
