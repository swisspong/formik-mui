import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import React from "react";

const Sidebar = () => {
  return (
    <Box
      position={"relative"}
      flex={1}
      p={2}
      borderRight={1}
      borderColor="grey.300"
      width={1}
      display={"block"}
    >
        <Box bgcolor={"red"}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      <Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
