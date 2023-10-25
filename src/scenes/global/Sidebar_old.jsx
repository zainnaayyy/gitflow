import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme, styled } from "@mui/material";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ScreenRotationAltIcon from "@mui/icons-material/ScreenRotationAlt";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import logoEhg from "../../assets/img/everylogo.png";
import DialpadIcon from "@mui/icons-material/Dialpad";
import StorageIcon from "@mui/icons-material/Storage";
import QueueIcon from "@mui/icons-material/Queue";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";

const StyledMenuItem = styled(MenuItem)(({ theme, selected }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-10px',
    right: 0,
    width: 'calc(100% + 10px)',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    opacity: selected ? 0.2 : 0,
    backgroundColor: selected ? 'rgba(62, 158, 250, 0.4)' : 'transparent',
    borderRadius: '10px',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
    paddingLeft: '10px',
  paddingRight: '10px',
  marginLeft: '-12px',
}));

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleItemClick = () => {
    setSelected(title);
  
  
  };

  return (
    <>
      <StyledMenuItem
        selected={selected === title}
        onClick={handleItemClick}
        icon={icon}
      >
        <Typography className="font-vz">{title}</Typography>
        <Link to={to} />
      </StyledMenuItem>
    </>
  );

};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  /* TEST OF COLLAPSE/EXPANG MENU HAMBURGUER */

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width < 768) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [width]);

  // Check if are logged to hide Sidebar
  const user_id = useSelector(selectCurrentId);
  const { isLoading, isSuccess } = useGetUserQuery(user_id);

  const user = useSelector(selectCurrentUser);
  const user_status = user ? `${user}` : "Not Logged"; // REMOVE AFTER FIX THE LOGIN MANEUBASE

  let content;

  if (isLoading) {
    // console.log('No sidebar when unlogged')
  } else if (isSuccess) {
    content = (
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[450]} !important`,
          },
          "& ::-webkit-scrollbar-track": {
            background: `${colors.primary[450]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: isCollapsed
              ? "5px 35px 5px 25px !important"
              : "5px 35px 5px 1px !important",
            color: colors.grey[200], // Menu Font color={colors.grey[200]}
          },
          "& .pro-inner-item:hover": {
            color: `${colors.contentSideBar[100]} !important`,
            fontWeight: "600",
          },
          "& .pro-menu-item.active": {
            color: `${colors.profile[100]} !important`,
          },
        }}
      >
        <ProSidebar
          collapsed={isCollapsed}
          style={{
            boxShadow: `0 1px 1px hsl(0deg 0% 0% / 0.075),
                          0 2px 2px hsl(0deg 0% 0% / 0.075),
                          0 4px 4px hsl(0deg 0% 0% / 0.075),
                          0 8px 8px hsl(0deg 0% 0% / 0.075),
                          0 16px 16px hsl(0deg 0% 0% / 0.075)`,
          }}
        >
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.contentSideBar[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <img
                    src={logoEhg}
                    alt="ehgcorp"
                    style={{
                      width: "150px",
                      filter: `drop-shadow(1px 1px 1px ${colors.contentSideBar[900]})`,
                    }}
                  />

                  <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                      color: colors.contentSideBar[100],
                    }}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    className="font-vz"
                    variant="h2"
                    color={colors.contentSideBar[100]}
                    fontWeight="bold"
                    sx={{ m: "5px 0 0 0" }}
                  >
                    {user_status}
                  </Typography>
                  <Typography
                    className="font-vz"
                    variant="h5"
                    color={colors.profile[100]}
                    fontWeight="600"
                  >
                    Administrator
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                /*icon={<HomeOutlinedIcon />} */
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                className="font-vz"
                variant="h6"
                color={colors.profile[100]}
                sx={{ m: "5px 0 1px 20px" }}
                fontWeight="600"
              >
                People Related
              </Typography>


              <SubMenu
                title="Users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              >
                <Item
                  title="Employees"
                  to="/users"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Customers"
                  to="/customers"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>

              <Typography
                className="font-vz"
                variant="h6"
                color={colors.profile[100]}
                sx={{ m: "5px 0 1px 20px" }}
                fontWeight="600"
              >
                Reports
              </Typography>

              <Item
                title="Analytics Carriers"
                to="/analytics/carriers"
                icon={<AnalyticsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                className="font-vz"
                variant="h6"
                color={colors.profile[100]}
                sx={{ m: "5px 0 1px 20px" }}
                fontWeight="600"
              >
                Voip Communication
              </Typography>
              <Item
                className="font-vz"
                title="Bridges"
                to="/bridges"
                icon={<StorageIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                className="font-vz"
                title="Endpoints"
                to="/endpoints"
                icon={<DialerSipIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                className="font-vz"
                title="Queues"
                to="/queues"
                icon={<QueueIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                className="font-vz"
                title="Calls log"
                to="/channels/logs"
                icon={<TextSnippetIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.profile[100]}
                sx={{ m: "5px 0 1px 20px" }}
                fontWeight="600"
              >
                Extra Features
              </Typography>

              <Item
                className="font-vz"
                title="Tickets"
                to="/tickets"
                icon={<ConfirmationNumberIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                className="font-vz"
                title="Diagram"
                to="/diagram"
                icon={<ScreenRotationAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                className="font-vz"
                title="Leads"
                to="/leads"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.profile[100]}
                sx={{ m: "15px 0 5px 20px" }}
                fontWeight="600"
              >
                Models
              </Typography>
              <Item
                className="font-vz"
                title="Charts"
                to="/charts"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                className="font-vz"
                title="Dialer"
                to="/dialer"
                icon={<DialpadIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  }
  return content;
};

export default Sidebar;
