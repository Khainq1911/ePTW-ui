import { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { sidebarContext } from "../hooks/context/sidebarContext";

export default function Sidebar() {
  const navigate = useNavigate();
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

  return (
    <Drawer open={openSidebar} onClose={toggleSidebar} sx={{ width: 300 }}>
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
              borderRadius: "20px",
              backgroundColor: selectedIndex === index ? "#E0E0E0" : "transparent",
              "&:hover": { backgroundColor: "#D6D6D6" },
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
