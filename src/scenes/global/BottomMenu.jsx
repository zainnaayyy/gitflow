import { Box, Paper, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  Dashboard,
  Storage
} from "@mui/icons-material";

import { selectCurrentUser } from "../../features/auth/authSlice";

import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";

function BottomMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Check if are logged to hide Bottom Menu

  const user_id = useSelector(selectCurrentId);
  const { isLoading, isSuccess } = useGetUserQuery(user_id);

  const user = useSelector(selectCurrentUser);
  const user_status = user ? `${user}` : "Not Logged"; // REMOVE AFTER FIX THE LOGIN MANEUBASE

  const BottomMenu = styled(Paper)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 40,
    backgroundColor: colors.primary[450],
    borderTop: `1px solid ${colors.primary[450]}`,
    zIndex: 1000,
  }));

  const BottomMenuItem = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: colors.grey[200],
    fontSize: 12,
    "&:hover": {
      backgroundColor: 'rgba(62, 158, 250, 0.4)',
      borderRadius: '5px',
      cursor: "pointer",
    },
  }));

  let content;

  if (isSuccess) {
    content = (
      <BottomMenu elevation={1}>
        <BottomMenuItem component={Link} to="/dashboard">
          <Dashboard />
        </BottomMenuItem>
        <BottomMenuItem component={Link} to="/analytics/carriers">
          <Analytics />
        </BottomMenuItem>
        <BottomMenuItem component={Link} to="/users">
          <PeopleOutlined />
        </BottomMenuItem>
        <BottomMenuItem component={Link} to="/bridges">
          <Storage />
        </BottomMenuItem>
        <BottomMenuItem component={Link} to="/tickets">
          <ConfirmationNumber />
        </BottomMenuItem>
        <BottomMenuItem component={Link} to="/leads">
          <ReceiptOutlined />
        </BottomMenuItem>
      </BottomMenu>
    );
  }
  return content;
}

export default BottomMenu;
