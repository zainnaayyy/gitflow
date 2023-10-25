import { useTheme, Box, Typography, Grid } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import BridgeMonitorStack from "../../../components/asterisk/bridges/BridgeMonitorStack";
import { InvalidateTagsEg } from "../../../components/dialer/InvalidateTagsEg";
import BridgeMonitorStatBox from "../../../components/asterisk/bridges/BridgeMonitorStatBox";

// import { BridgeCreator } from "../../../components/asterisk/bridges/BridgeCreator";


const Bridges = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Calls Center" subtitle="Beta Version" />

      <Box>
          <Box>
          <Grid container spacing={2}>
          {/* Chart 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className="card-dash card-shadow card-animation"
                gridColumn="span 3"
                backgroundColor={colors.primary[710]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <BridgeMonitorStatBox
                  title="Vendors"
                  subtitle="Top 5"
                  progress="80"
                  increase="+10%"
                  inside="Monthly"
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.contentCard[300], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>{" "}
              {/* Chart 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className="card-dash card-shadow card-animation"
                gridColumn="span 3"
                backgroundColor={colors.primary[710]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <BridgeMonitorStatBox
                  title="Calls"
                  subtitle="Billed 60 secs"
                  progress="60"
                  increase="+43%"
                  inside="Daily Goal"
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.contentCard[300], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>{" "}
              {/* Chart 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className="card-dash card-shadow card-animation"
                gridColumn="span 3"
                backgroundColor={colors.primary[710]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <BridgeMonitorStatBox
                  title="Carriers"
                  subtitle="BackOffice Importing"
                  progress="34"
                  increase="+43%"
                  inside="Weekly"
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.contentCard[300], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Grid>
          </Grid>
          </Box>
        </Box>
        <BridgeMonitorStack />
      </Box>
  );
};

export default Bridges;
