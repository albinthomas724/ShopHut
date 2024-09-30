import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import shophutlogo from "../assets/shophutlogo.png";

const pages = ["Home", "Cart", "About", "Contact"];
const settings = ["Profile", "Account", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState(pages[0]);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // Add useNavigate hook

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setMenuOpen(false);
  };

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    handleCloseNavMenu();

    // Handle navigation based on the selected page
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "Cart":
        navigate("/cart");
        break;
      case "About":
        navigate("/about");
        break;
      case "Contact":
        navigate("/contact");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between">
            {/* Logo Section */}
            <div className="flex justify-center">
              <img
                src={shophutlogo}
                alt="ShopHut Logo"
                className="w-10 h-10"
                style={{ width: "100%", height: "80px" }}
              />
            </div>

            {/* Mobile Menu Toggle Icon */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="black"
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={menuOpen}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" }, mt: "40px" }}
              >
                <Box className="flex justify-between items-center p-2">
                  <Typography variant="h6">Menu</Typography>
                  <IconButton onClick={handleCloseNavMenu}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageChange(page)}>
                    <Typography
                      className={`text-center ${
                        selectedPage === page
                          ? "font-bold text-blue-500"
                          : "text-black"
                      }`}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`my-2  ${
                    selectedPage === page
                      ? "font-bold text-blue-500"
                      : "text-black"
                  }`}
                  sx={{ color: selectedPage === page ? "blue" : "black" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* User Settings Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography className="text-center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add spacing below Navbar */}
      <Box sx={{ marginTop: "90px" }}>
      </Box>
    </>
  );
}

export default Navbar;
