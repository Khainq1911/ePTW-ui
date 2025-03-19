import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  return (
    <div className="w-screen h-[60px] bg-[#4682B4] fixed top-0 left-0 px-5">
      <div className="sm:hidden lg:hidden float-left leading-[60px]">
        <MenuIcon fontSize="large" className="cursor-pointer text-[#fff]" />
      </div>
      <div className="float-right leading-[60px]">
        <AccountCircleIcon
          fontSize="large"
          className="cursor-pointer text-[#fff]"
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
