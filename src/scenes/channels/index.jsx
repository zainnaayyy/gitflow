import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ChannelMonitor from "../../components/asterisk/endpoints/ChannelMonitor";
import { BridgeCreator } from "../../components/asterisk/bridges/BridgeCreator";
import BridgeMonitorStack from "../../components/asterisk/bridges/BridgeMonitorStack";

import { InvalidateTagsEg } from "../../components/dialer/InvalidateTagsEg";

const Channels = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Calls Center" subtitle="Beta Version" />
      <Box>
        <Box display="flex">
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Typography variant="h3" color={colors.grey[200]}>
              Bridges Monitor
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <BridgeCreator />
            <InvalidateTagsEg />
          </Box>
        </Box>
        <BridgeMonitorStack />
        <Box>
          {/* 
          <BridgeMonitor />
          */}
        </Box>
      </Box>
      <Typography variant="h3" color={colors.grey[200]} marginTop="20px">
        Channels
      </Typography>

      <ChannelMonitor />
    </Box>
  );
};

export default Channels;
