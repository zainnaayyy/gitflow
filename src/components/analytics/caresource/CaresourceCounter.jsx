import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

import { useGetCaresourceQuery } from "../../../features/analytics/analyticsApiSlice";

const CaresourceCounter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: caresource, isLoading, isSuccess } = useGetCaresourceQuery();

  let content;

  if (isLoading) {
    content = "Counting ...";
  } else if (isSuccess) {
    content = (
      <>
        <div>
          <Box
            m=" 0 20px 0"
            backgroundColor={colors.primary[710]}
            className="card-dash card-shadow card-animation"
            height={250}
            width={"100%"}
          >
            <div className="header-card-chart">
              <span>Customers Count</span>
            </div>
            <div className="content-chart-card">
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
                Active Policys
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
               {caresource['customers_count']['customers_count']}
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
                Updated ../../../
              </Typography>
            </div>
          </Box>
        </div>
      </>
    );
    return content;
  }
};

export default CaresourceCounter;
