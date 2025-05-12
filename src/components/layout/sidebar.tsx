/* import { useContext, useEffect, useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";

import { sidebarContext } from "../../hooks/context/sidebarContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { openSidebar, toggleSidebar } = useContext(sidebarContext) || {};

  const listItems = [
    { name: "Templates", icon: <DescriptionIcon />, url: "/" },
    { name: "Permits", icon: <AssignmentIcon />, url: "/permit" },
  ];

  const handleListItemClick = (index: number, url: string) => {
    setSelectedIndex(index);
    navigate(url);
  };

  useEffect(() => {
    listItems.map((item, index) => {
      if (location.pathname.includes(item.url)) {
        return setSelectedIndex(index);
      }
    });
  }, [location.pathname]);

  return (
    <Drawer
      open={openSidebar}
      onClose={toggleSidebar}
      className="block sm:hidden"
    >
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton onClick={toggleSidebar}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <List>
        {listItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.url)}
            sx={{
              width: 200,
              borderRadius: "10px",
              backgroundColor:
                selectedIndex === index ? "#E0E0E0" : "transparent",
            }}
          >
            {item.icon}
            <ListItemText primary={item.name} sx={{ marginLeft: 1 }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
 */

import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Divider } from '@mui/material';
import { useContext, useMemo } from 'react';
import { getUser } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { sidebarContext } from '../../hooks/context/sidebarContext';

const listItem = [
    { label: 'Dashboard', icon: <HomeOutlinedIcon />, url: '/dashboard' },
    { label: 'Templates', icon: <FolderOutlinedIcon />, url: '/' },
    { label: 'Create Templates', icon: <AddCircleOutlineOutlinedIcon />, url: '/template/add' },
    { label: 'Permits', icon: <FeedOutlinedIcon />, url: '/permit' },
];

export default function Sidebar() {
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
            className={`${context?.openSidebar ? '' : 'hidden'} lg:block w-72 h-full fixed top-0 left-0 z-50 bg-[#FAFAFA]`}
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
                        className={`hover:bg-[#F4F4F5] flex items-center gap-2 p-1 rounded-xl mb-1 ${isActive(item.url) ? 'bg-[#F4F4F5] font-semibold' : ' text-[#3F3F46]'}`}
                    >
                        {item.icon}
                        <p className="text-[18px]">{item.label}</p>
                    </Link>
                ))}
            </div>

            <Divider />

            <div className="flex items-center justify-start ml-8 h-[80px] gap-4">
                <AccountCircleRoundedIcon sx={{ fontSize: '40px', color: '#3F3F46' }} />
                <p className="text-[20px] font-bold text-[#3F3F46]">{userName}</p>
            </div>
        </div>
    );
}
