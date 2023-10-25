import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

import { useBcbsQuery } from "../../../features/analytics/analyticsApiSlice";

const BcbsCounter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: carrier, isLoading, isSuccess } = useBcbsQuery();

  let content;

  if (isLoading) {
    content = "Counting ...";
  } else if (isSuccess) {
    content = (

          <Box
            m="0 0 20px 0"
            backgroundColor={colors.primary[710]}
            className="card-dash card-shadow card-animation"
            height={250}
            width={"100%"}
          >
            <Box className="header-card-chart">
              <span>Active Visitors</span>
            </Box>
            <Box className="content-chart-card">
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontSize: "28px",
                  fontWeight: "600",
                  mt: 3,
                  color: colors.contentSideBar[500],
                }}
              >
                Rigth now
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: "68px",
                  fontWeight: "600",
                  color: colors.greenAccent[500],
                }}
              >
               {carrier['customers_count']['customers_count']}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: colors.contentSideBar[700],
                }}
              >
                Active Customers
              </Typography>
            </Box>
          </Box>

    );
    return content;
  }
};

export default BcbsCounter;
