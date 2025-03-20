import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {ListItemIcon, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { sidebarContext } from "../hooks/context/sidebarContext";
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
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const listItems = [
    { name: "Templates", icon: <DescriptionIcon />, url: "/" },
    { name: "Permits", icon: <AssignmentIcon />, url: "/permit" },
  ];

  return (
    <div className="w-screen h-[70px] bg-[#F6F8FA] fixed top-0 left-0 px-5 border-b-1 border-[#D1D9E0]">
      <div className="flex justify-between items-center h-full">
        <div
          className="block sm:hidden"
          onClick={context?.toggleSidebar}
        >
          <MenuIcon fontSize="large" className="cursor-pointer text-[#000]" />
        </div>
        <div className="hidden sm:block">
          <Tabs value={value} onChange={handleChange}>
            {listItems.map((item, index) => (
              <Tab
                label={item.name}
                key={index}
                icon={item.icon}
                iconPosition="start"
                onClick={() => navigate(item.url)}
              />
            ))}
          </Tabs>
        </div>
        <AccountCircleIcon
          fontSize="large"
          className="cursor-pointer text-[#000]"
          onClick={handleClick}
        />
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
