import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header"
import { tokens } from "../../../theme";
import CampaignSendIndex from "../../../components/campaigns/CampaignSend/CampaignSendIndex";

const CampaignSend = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Campaigns" subtitle="Campaigns" />
          <CampaignSendIndex colors={colors}/>
    </Box>
  );
};

export default CampaignSend;
