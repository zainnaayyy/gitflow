import React from "react";
import { Grid, Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import SettingsTabs from "../../components/settings/SettingsTabs";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Box m="20px">
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "-30px", marginBottom: "-40px" }}
        >
          <Grid item xs={6} md={7}>
            <Header title="Settings" subtitle="Global Settings" />
          </Grid>
        </Grid>
              <Box
        m="40px 0 0 0"
        height="75vh"
        className="card-shadow card-dash"
        backgroundColor={colors.primary[710]}
      >
        <SettingsTabs colors={colors}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
