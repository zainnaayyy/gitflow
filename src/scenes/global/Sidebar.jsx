import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme, styled } from "@mui/material";

import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";

import {
  HomeOutlined,
  PeopleOutlined,
  ContactsOutlined,
  ReceiptOutlined,
  BarChartOutlined,
  PhoneOutlined,
  MenuOutlined,
  ScreenRotationAlt,
  ConfirmationNumber,
  DialerSip,
  Analytics,
  TextSnippet,
  Dialpad,
  Storage,
  Queue,
  RequestQuote,
  Science,
  Hub,
  AddIcCall,
  Campaign,
} from "@mui/icons-material";

import TuneIcon from '@mui/icons-material/Tune';

import logoReemagine from "../../assets/img/logo.png";

import { selectCurrentUser, selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { useLocalStorage } from "../../shared";
import Campaigns from "../campaigns/setup";

const StyledMenuItem = styled(MenuItem)(({ theme, selected }) => ({
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-40px", // Position of the abovelayer
    right: 0,
    width: "calc(100% + 30px)",
    height: "100%",
    // backgroundColor: theme.palette.primary.main,
    // opacity: selected ? 0.3 : 0,
    backgroundColor: selected ? "rgba(62, 158, 250, 0.2)" : "transparent",
    borderRadius: "6px",
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  },
  paddingLeft: "20px",
  paddingRight: "10px",
  marginLeft: "-20px", // Distance of letf margin
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
  const [user, setUser] = useLocalStorage("user", null);
  // const user_id = useSelector(selectCurrentId);
  const { data: profile, isLoading, isSuccess } = useGetUserQuery(user?.user?.id);

  // const user = useSelector(selectCurrentUser);
  const user_status = user ? `${user?.user?.first_name}` : "Not Logged"; // REMOVE AFTER FIX THE LOGIN MANEUBASE

  let avatarUrl = ''
  // if (isSuccess) {
  //   avatarUrl = `https://back.iqbot.live/media/image/avatar/${profile['user']['user']}.png?${Date.now()}`;
  //   // avatarUrl = `http://localhost:8000/media/avatars/${profile['user']['user']}.png?${Date.now()}`;
  // }

  let content;

  if (isLoading) {
    // console.log('No sidebar when unlogged')
  } else if (true) {
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
              /* FIX POSITION OF COMPONENTS WHEN isCollapsed BEFORE ACTIVATE */
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlined /> : undefined}
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
                  mt="10px"
                  mb="12px"
                >
                  
                  <img
                    src={logoReemagine}
                    onClick={<Link to="/dashboard" />} 
                    alt="ehgcorp"
                    style={{
                      width: "160px",
                      filter: `drop-shadow(4px 4px 5px ${colors.contentSideBar[900]})`,
                    }}
                  />
                  
                  {/* FIX POSITION OF COMPONENTS WHEN isCollapsed BEFORE ACTIVATE */}
                  <IconButton
                        /*onClick={() => setIsCollapsed(!isCollapsed)} style={{color: colors.grey[200] }} */
                        >
                      <MenuOutlined />
                     </IconButton> 
                    
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px" className="card-shadow-2" sx={{ backgroundColor: colors.primary[1100], mb: 4, border: `dotted 0.2px ${colors.primary[900]}`, borderRadius: '10px', pb: 1,   paddingLeft: "20px", paddingRight: "10px", marginLeft: "-20px", marginRight: "10px" }}>
                {/* 
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // ml: "30%",  // FIX IT, ITS a GAMBIARRA, NEED TO FIX THE IMAGE IN THE CENTRE
                    }}
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      src={avatarUrl}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
                */}

                <Box textAlign="center">
                  <Typography
                    
                    variant="h2"
                    color={colors.grey[200]}
                    fontWeight="500"
                    sx={{ m: "5px 0 0 0" }}
                  >
                    {user_status}
                  </Typography>
                  <Typography
                    className="font-vz"
                    variant="h5"
                    color={colors.profile[100]}
                    fontWeight="500"
                  >
                    {profile["user"]["user_role"]}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlined />}
                /*icon={<HomeOutlined />} */
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Analytics Carriers"
                to="/analytics/carriers"
                icon={<Analytics />}
                selected={selected}
                setSelected={setSelected}
              />

              <SubMenu
                title="Users"
                icon={<PeopleOutlined />}
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

              <SubMenu
                title="VoIP"
                icon={<Hub />}
                selected={selected}
                setSelected={setSelected}
              >
                <Item
                  title="Bridges"
                  to="/bridges"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Queues"
                  to="/queues"
                  selected={selected}
                  setSelected={setSelected}
                />

               
                <Item
                  title="Endpoints"
                  to="/endpoints"
                  selected={selected}
                  setSelected={setSelected}
                />
                {/** 
                <Item
                  title="CDR Custom"
                  to="/calls"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="CDR Asterisk"
                  to="/channels/logs"
                  selected={selected}
                  setSelected={setSelected}
                />
                */}
                
              </SubMenu>
             
              <SubMenu
                title="Marketing"
                icon={<PeopleOutlined />}
                selected={selected}
                setSelected={setSelected}
              >
                <Item
                  title="Landing Page"
                  to="/landing-page"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            

              {/** 
              <Item
                className="font-vz"
                title="Tickets"
                to="/tickets"
                icon={<ConfirmationNumber />}
                selected={selected}
                setSelected={setSelected}
              />
              */}
              
              <Item
                className="font-vz"
                title="Leads"
                to="/leads"
                icon={<RequestQuote />}
                selected={selected}
                setSelected={setSelected}
              />

              <SubMenu
                title="Campaigns"
                icon={<PeopleOutlined />}
                selected={selected}
                setSelected={setSelected}
              >
                <Item
                  title="Send"
                  to="/campaign-send"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Setup"
                  to="/campaign-setup"
                  selected={selected}
                  setSelected={setSelected}
                />

              </SubMenu>

              <Item
                className="font-vz"
                title="Settings"
                to="/settings"
                icon={<TuneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              {/** 
              <SubMenu
                title="Testing"
                icon={<Science />}
                selected={selected}
                setSelected={setSelected}
              >
              <Item
                  title="Maps"
                  to="/maps"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Diagram"
                  to="/diagram"
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Charts"
                  to="/charts"
                  selected={selected}
                  setSelected={setSelected}
                />
                
              </SubMenu>
             
              <SubMenu
                title="Dialer"
                icon={<AddIcCall />}
                selected={selected}
                setSelected={setSelected}
              >
                <Item
                  title="Power Dialer"
                  to="/power-dialer"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Campaigns"
                  to="/campaigns"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
              */}

            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  }
  return content;
};

export default Sidebar;
