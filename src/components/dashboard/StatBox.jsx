import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "../charts/ProgressCircle";
import ReactApexChart from "react-apexcharts";
import RadialBarCard from "./charts/RadialBarCard";

const StatBox = ({ title, subtitle, icon, progress, increase, inside }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = {
    series: [progress],
    options: {
      chart: {
        type: "radialBar",
      },

      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              color: '#000000', // set the color of the text inside the radial bar
            },
          },
        },
      },
      
      plotOptions: {
        radialBar: {
          hollow: {
            size: "47%",
          },
        },
      },

      labels: [increase],
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <RadialBarCard series={[progress]} color="#64b5f6" height={200} label={inside} />
      </Grid>
      <Grid item xs={1} md={1}>
        
        </Grid>
      <Grid item xs={3} md={3}>
        <Box sx={{ mt: 6, fontSize: 20, color: colors.profile[400], fontWeight: 600, display:"flex", justifyContent:"center"}}> {title} </Box>
        <Box sx={{ fontSize: 13, color: colors.grey[300], fontWeight: 600, }}> {subtitle} </Box>
      </Grid>
  

    </Grid>
  );
};

export default StatBox;
