import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../styles/Topbar.css";

// Custom menu icon component
const CustomMenuIcon = ({ onClick }) => (
  <div onMouseDown={onClick} style={{ cursor: 'pointer' }}>
    <div style={{ width: '24px', height: '3px', backgroundColor: 'white', margin: '5px 0' }}></div>
    <div style={{ width: '18px', height: '3px', backgroundColor: 'white', margin: '5px 0' }}></div>
    <div style={{ width: '12px', height: '3px', backgroundColor: 'white', margin: '5px 0' }}></div>
  </div>
);

const Topbar = ({ toggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && anchorEl.contains && !anchorEl.contains(event.target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <AppBar position="fixed" className="topbar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onMouseDown={handleToggleSidebar}
          onMouseUp={handleToggleSidebar}
        >
          <CustomMenuIcon onClick={handleToggleSidebar} /> {/* Use the custom icon here */}
        </IconButton>
        <Typography variant="h6" noWrap component="div" className="title">
          Mail Templates
        </Typography>
        <Box className="right-icons">
          <IconButton color="inherit" onClick={handleFullScreen}>
            <FullscreenIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
            <Typography
              variant="body2"
              noWrap
              component="div"
              className="username"
            >
              Rami Mahdi
            </Typography>
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <List component="nav" aria-label="main mailbox folders">
              <ListItem
                button
                component={Link}
                to="/editprofile"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/changepass"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Menu>
          <Typography variant="body2" className="datetime">
            {formatDate(currentTime)} | {formatTime(currentTime)}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Topbar;
