import { Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DialTop from "../../components/dialer/DialTop";

import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Check if are logged to hide Sidebar
  const user_id = useSelector(selectCurrentId);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(user_id);

  let content;

  if (isLoading) {
    // console.log('No TOPBAR when unlogged')
  } else if (isSuccess) {
    content = (
      <Box
        className="card-shadow sticky"
        display="flex"
        justifyContent="space-between"
        p={2}
        backgroundColor={colors.grey[80]}
      >
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          backgroundColor={colors.primary[1000]}
          borderRadius="3px"
          className="pull-center card-shadow card-dash"
          sx={{ width: "200px", top: 8 }}
        >
          <DialTop />
        </Box>

        {/* ICONS */}
        <Box className="box-icons pull-right">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <Tooltip title="Profile" className="my-tooltip">
            <IconButton>
              <Link to="/profile" className="brouter-link">
                <PersonOutlinedIcon
                  sx={{
                    mt: "2px",
                    color: colors.headerCard[300],
                  }}
                />
              </Link>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    );
  }
  return content;
};

export default TopBar;
