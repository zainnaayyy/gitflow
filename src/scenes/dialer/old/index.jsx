import { useTheme, Box, Typography, Grid } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DialPadOri from "../../../components/dialer/DialPadOri";
import Stasis from "../../../components/stasis/Stasis";
import ServerStatusCard from "../../../components/dialer/ServerStatusCard";
import CallStatusCard from "../../../components/dialer/CallStatusCard";

const Dialer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Dialer" subtitle="Beta Version" />
      <Box>
        <Grid container spacing={2}>
          <Grid alignItems="center" justifyContent="center" item xs={12} md={4}>
            <ServerStatusCard />
          </Grid>
          <Grid alignItems="center" justifyContent="center" item xs={12} md={4}>
            <DialPadOri />
          </Grid>
          <Grid alignItems="center" justifyContent="center" item xs={12} md={4}>
            <CallStatusCard />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid alignItems="center" justifyContent="center" item xs={12} md={4}>
            
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dialer;
