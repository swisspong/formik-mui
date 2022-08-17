import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PetsIcon from "@mui/icons-material/Pets";
import React from "react";
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolBar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Logo
        </Typography>
        <PetsIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="Search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar sx={{ width: 30, height: 30 }}>H</Avatar>
        </Icons>
        <UserBox>
          <Avatar sx={{ width: 30, height: 30 }}>H</Avatar>
          <Typography variant="span">Hana</Typography>
        </UserBox>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
