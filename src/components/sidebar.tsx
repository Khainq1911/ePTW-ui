import {  useContext, useEffect, useState } from "react";
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
import { sidebarContext } from "../hooks/context/sidebarContext";

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
