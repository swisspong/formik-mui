import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  Outlet,
  useLocation,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const drawerWidth = 240;

const LayoutNew = (props) => {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            onClick: () => navigate("/"),
          },
          {
            text: "Category",
            icon: <CategoryIcon />,
            onClick: () => navigate("/category"),
          },
          {
            text: "Inventory",
            icon: <InventoryIcon />,
            onClick: () => navigate("/inventory"),
          },
          {
            text: "Product",
            icon: <PrecisionManufacturingIcon />,
            onClick: () => navigate("/product"),
          },
          {
            text: "Order",
            icon: <ListAltIcon/>,
            onClick: () => navigate("/order"),
          },
        ].map(({ text, icon, onClick }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={onClick}>
              <ListItemIcon>
                {icon ? icon : index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );
  const breadcrumbNameMap = {
    "": "Dashboard",
    category: "Category",
    inventory: "Inventory",
    product: "Product",
    create: "Create",
    edit: "Edit",
    view: "View",
    variants: "Variants",
    options: "Options",
  };
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(pathnames);
  const pathnamesFilter = pathnames.filter((item) =>
    !breadcrumbNameMap[item] ? false : true
  );
  console.log("pathnameFilter", pathnamesFilter);
  const newBreadcrumbs = pathnamesFilter.map((path, index) => {
    if (index === pathnamesFilter.length - 1) {
      console.log("case 1");
      return (
        <Typography key={index + 1} color="text.primary">
          {breadcrumbNameMap[path]}
        </Typography>
      );
    } else {
      //console.log("test", pathnames);

      // *** config here
      console.log("case 2");
      console.log(
        undefined === breadcrumbNameMap[pathnames[pathnames.indexOf(path) + 1]]
      );
      console.log(pathnames[pathnames.indexOf(path) + 1]);

      let url = "";
      for (let i = 0; i < index + 1; i++) {
        url += "/" + pathnamesFilter[i];
        if (
          undefined ===
          breadcrumbNameMap[pathnames[pathnames.indexOf(path) + 1]]
        ) {
          if (pathnamesFilter[i] === path) {
            console.log("path", path);
            console.log(pathnamesFilter[index]);
            url += "/" + pathnames[pathnames.indexOf(path) + 1];
          }
        }
      }
      console.log(url);
      return (
        <Link
          component={RouterLink}
          underline="hover"
          key={index + 1}
          color="inherit"
          to={url}
        >
          {breadcrumbNameMap[path]}
        </Link>
      );
    }
  });
  newBreadcrumbs.unshift(
    <Link
      component={RouterLink}
      underline="hover"
      key={0}
      color="inherit"
      to={"/"}
    >
      {"Dashboard"}
    </Link>
  );

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{  bgcolor: "grey.50", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          // flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          {newBreadcrumbs}
        </Breadcrumbs>

        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutNew;
