import React from "react";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../components/dashboard/StatBox";
import DashHeatMapChart from "../../components/dashboard/charts/DashHeatMapChart";
import QuickCallWidget from "../../components/widgets/QuickCallWidget";
import RecentCallWidget from "../../components/widgets/RecentCallWidget";
import CarrierLine from "../../components/analytics/carriers/CarrierLine";
import DashDoughnutsChart from "../../components/dashboard/charts/DashDoughnutsChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  {
    /* 
  // REFACTOR WITH INTRA-SERVER INVALIDATETAGS, API FRITANDO
  const {
    data: logs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCallsActivityQuery(); // undefined, { pollingInterval: 10000, refetchOnMountOrArgChange: true }
*/
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Reemagine Panel" />

        <Box mt="50px">
          {/* 
          <Button
            className="btn-dash-dowload"
            sx={{
              backgroundColor: colors.greenAccent[710],
              color: colors.greenAccent[610],
              fontSize: "16px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
          */}
        </Box>
      </Box>

      {/* Charts */}

      <Grid container spacing={2}>
        {/* Chart 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            className="card-dash card-shadow card-animation"
            gridColumn="span 3"
            backgroundColor={colors.primary[710]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Customers"
              subtitle="+ Current Month"
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
        <Grid item xs={12} sm={6} md={3}>
          <Box
            className="card-dash card-shadow card-animation"
            gridColumn="span 3"
            backgroundColor={colors.primary[710]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
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
        <Grid item xs={12} sm={6} md={3}>
          <Box
            className="card-dash card-shadow card-animation"
            gridColumn="span 3"
            backgroundColor={colors.primary[710]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
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
        </Grid>{" "}
        {/* Chart 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            className="card-dash card-shadow card-animation"
            gridColumn="span 3"
            backgroundColor={colors.primary[710]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Tickets"
              subtitle="Tickets Answered"
              progress="86"
              increase="+43%"
              inside="Daily"
              icon={
                <TrafficIcon
                  sx={{ color: colors.contentCard[300], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={4} md={2}>
          <Box
            className="card-dash card-shadow"
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[710]}
            overflow="auto"
            height={406}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`0.5px solid ${colors.grey[90]}`}
              color={colors.grey[100]}
              p="15px"
              position="sticky"
              top={0}
              zIndex={1}
              backgroundColor={colors.primary[710]} // Set the background color here
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[200]}
                mb={-1}
              >
                Recent Calls
              </Typography>
            </Box>
            <RecentCallWidget />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <DashHeatMapChart />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Box
            className="card-dash card-shadow"
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[710]}
            overflow="auto"
            height={406}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`0.5px solid ${colors.grey[90]}`}
              color={colors.grey[100]}
              p="15px"
              position="sticky"
              top={0}
              zIndex={3}
              backgroundColor={colors.primary[710]} // Set the background color here
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[200]}
                mb={-1}
              >
                Users
              </Typography>
            </Box>

            <QuickCallWidget colors={colors} />
          </Box>
        </Grid>
      </Grid>

      {/* ROW 2 */}

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            className="card-dash card-sahdow"
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[710]}
            sx={{ mt: 3}}
          >
            <CarrierLine />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            className="card-dash card-sahdow"
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[710]}
            sx={{ mt: 3}}
          >
            <DashDoughnutsChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
