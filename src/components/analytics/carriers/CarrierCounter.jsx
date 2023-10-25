import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

import { useGetCarrierQuery } from "../../../features/analytics/analyticsApiSlice";

const CarrierCounter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: carriers, isLoading, isSuccess } = useGetCarrierQuery();

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
        <Box
          borderBottom={`0.5px solid ${colors.grey[90]}`}
          className="header-card-chart"
        >
          <Typography
            color={colors.grey[200]}
            ml={1}
            mt={1}
            mb={1}
            fontWeight={600}
          >
            Carriers
          </Typography>
        </Box>
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
            Active
          </Typography>
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: "68px",
              fontWeight: "600",
              color: colors.profile[100],
            }}
          >
            {carriers["carriers_list"].length}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: colors.contentSideBar[700],
            }}
          >
            Updated 10/05/2023
          </Typography>
        </div>
      </Box>
    );
    return content;
  }
};

export default CarrierCounter;
