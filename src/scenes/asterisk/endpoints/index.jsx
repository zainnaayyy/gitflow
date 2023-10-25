import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import EndpointsMonitor from "../../../components/asterisk/endpoints/EndpointsMonitor";
import ChannelMonitor from "../../../components/asterisk/endpoints/ChannelMonitor";

const Endpoints = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Endpoints" subtitle="Beta Version" />

      <Typography variant="h3" color={colors.grey[200]} marginTop="20px">
        Extensions
      </Typography>

      <EndpointsMonitor />
      {/*<ChannelMonitor />*/}
    </Box>
  );
};

export default Endpoints;
