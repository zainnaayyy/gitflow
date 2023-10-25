import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from '@mui/icons-material/Settings';
import "./Steps.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { Box } from "@mui/material";

const Steps = ({ currentStep }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box className="steps">
      <div className="step active">
        <PersonIcon />
        <span>Personal</span>
      </div>
      <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
        <HomeIcon />
        <span>Address</span>
      </div>
      <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
        <SettingsIcon />
        <span>Settings</span>
      </div>
      <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
        <CheckCircleIcon />
        <span>Confirm</span>
      </div>
    </Box>
  );
};

export default Steps;
