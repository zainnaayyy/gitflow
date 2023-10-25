import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header"
import { tokens } from "../../../theme";
import CampaignSetupIndex from "../../../components/campaigns/CampaignSetup/CampaignSetupIndex";

const CampaignSetup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Campaigns" subtitle="Campaigns" />
          <CampaignSetupIndex colors={colors}/>
    </Box>
  );
};

export default CampaignSetup;

