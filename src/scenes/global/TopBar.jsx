import { Box, IconButton, useTheme, Tooltip, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { isMobile } from "react-device-detect";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DialTop from "../../components/dialer/DialTop";

import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import OffCanvasScript from "../../components/dialer/callScripts/OffCanvasScript";
import { useLocalStorage } from "../../shared";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  // Check if is logged to hide Sidebar
  const [user, setUser] = useLocalStorage("user", null);
  // const user_id = useSelector(selectCurrentId);
  const { data: profile, isLoading, isSuccess } = useGetUserQuery(user?.user?.id);

  let avatarUrl = ''
  // if (isSuccess) {
  //   avatarUrl = `https://back.iqbot.live/media/image/avatar/${profile['user']['user']}.png?${Date.now()}`;
  //   // avatarUrl = `http://localhost:8000/media/avatars/${profile['user']['user']}.png?${Date.now()}`;
  // }

  let content;

  if (isLoading) {
    // console.log('No TOPBAR when unlogged')
  } else if (true) {
    content = (
      <>
        {!isMobile ? (
          <Box
            className="card-shadow-2 sticky"
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ backdropFilter: "blur(40px)"}}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={2}>
                <Box
                  display="flex"
                  backgroundColor={colors.grey[80]}
                  borderRadius="3px"
                  className="card-shadow-2"
                  sx={{borderRadius: "10px"}}
                >
                  <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
                  <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item md={1}>
                <Box></Box>
              </Grid>
              <Grid item xs={5} md={3}>
                <Box>
                  <DialTop colors={colors}/>
                  {/* <OffCanvasScript /> */}
                </Box>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box>
                  <Tooltip title="Light/Dark" className="my-tooltip card-shadow-2" sx={{ ml: 1, backgroundColor: colors.grey[80]}}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                      {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon sx={{ color: colors.grey[200] }}/>
                      ) : (
                        <LightModeOutlinedIcon sx={{ color: colors.grey[200] }}/>
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Alerts" className="my-tooltip card-shadow-2" sx={{ ml: 1, backgroundColor: colors.grey[80]}}>
                    <IconButton>
                      <NotificationsOutlinedIcon sx={{ color: colors.grey[200] }}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Settings" className="my-tooltip card-shadow-2"sx={{ ml: 1, backgroundColor: colors.grey[80]}}>
                    <IconButton>
                      <SettingsOutlinedIcon sx={{ color: colors.grey[200] }}/>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item md={1}>
              <Tooltip title="Profile" className="my-tooltip">
              <Link to="/profile" className="brouter-link">
                  <Box
                    className="card-shadow-2"
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid #3c9dfa"
                    }}
                  >
                    <img
                      alt="profile-user"
                      width="50px"
                      src={avatarUrl}
                      style={{ cursor: "pointer" }}
                      
                    />
                  </Box>
                  </Link>
                  </Tooltip>
              </Grid>

            </Grid>
          </Box>
        ) : (
          (content = "")
        )}
      </>
    );
  }
  return content;
};

export default TopBar;
