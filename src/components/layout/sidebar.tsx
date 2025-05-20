import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Logout from '@mui/icons-material/Logout';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { getUser } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { sidebarContext } from '../../context/sidebarContext';

const listItem = [
    { label: 'Dashboard', icon: <HomeOutlinedIcon />, url: '/' },
    { label: 'Templates', icon: <FolderOutlinedIcon />, url: '/template' },
    { label: 'Create Templates', icon: <AddCircleOutlineOutlinedIcon />, url: '/template/add' },
    { label: 'Permits', icon: <FeedOutlinedIcon />, url: '/permit' },
];

export default function Sidebar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    const { pathname } = useLocation();
    const context = useContext(sidebarContext);
    const userName = useMemo(() => {
        return getUser()?.name;
    }, []);

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div
            className={`${context?.openSidebar ? '' : 'hidden'} lg:block w-80 h-full fixed top-0 left-0 z-50 bg-[#FAFAFA] border-r-1 border-gray-200`}
        >
            <div className="flex items-center justify-start ml-8 h-[80px] gap-4">
                <FeedOutlinedIcon sx={{ fontSize: '32px', color: '#3F3F46' }} />
                <p className="text-[28px] font-bold text-[#3F3F46]">PTW System</p>
            </div>

            <Divider />

            <div style={{ height: 'calc(100vh - 160px)' }}>
                {listItem.map((item: any, index: number) => (
                    <Link
                        onClick={context?.toggleSidebar}
                        key={index}
                        to={item.url}
                        className={`hover:bg-[#F4F4F5] flex items-center gap-2 py-2 px-4 rounded-xl mb-1 ${isActive(item.url) ? 'bg-[#F4F4F5] font-semibold' : ' text-[#3F3F46]'}`}
                    >
                        {item.icon}
                        <p className="text-[18px]">{item.label}</p>
                    </Link>
                ))}
            </div>

            <Divider />

            <div className="flex items-center justify-start ml-8 h-[80px] gap-4 cursor-pointer" onClick={handleClick}>
                <AccountCircleRoundedIcon sx={{ fontSize: '40px', color: '#3F3F46' }} />
                <p className="text-[20px] font-bold text-[#3F3F46]">{userName}</p>
            </div>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
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
