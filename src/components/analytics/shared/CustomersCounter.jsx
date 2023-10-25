import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";

import { useGetCaresourceQuery } from "../../../features/analytics/analyticsApiSlice";

const CustomersCounter = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: caresource, isLoading, isSuccess } = useGetCaresourceQuery();

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
            Active Customers
          </Typography>
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
            {props.carrier}
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
            {props.active_users}
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

export default CustomersCounter;
