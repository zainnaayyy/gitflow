import { Box, Typography, useTheme, Grid } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";
import { DraggableCarriers } from "./DraggableCarriers";

import { useGetCarrierQuery } from "../../../features/analytics/analyticsApiSlice";

const CarrierCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: carriers, isLoading, isSuccess } = useGetCarrierQuery();

  if (isSuccess) {
    console.log("carriers_list:", carriers["carriers_list"]);
  }

  let content;

  if (isLoading) {
    content = "Counting ...";
  } else if (isSuccess) {
    content = (
        <Grid container spacing={2}>
          {carriers["carriers_list"].map((carrier) => {
            return (
              <Grid item xs={12} md={3} key={carrier.id}>
                <Box
                  m="0 0 20px 0"
                  backgroundColor={colors.primary[710]}
                  className="card-dash card-shadow card-animation"
                  height={220}
                  width={"100%"}
                >
                  <div className="content-chart-card">
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        fontSize: "26px",
                        fontWeight: "600",
                        mt: 3,
                        pt: 2,
                        color: colors.contentSideBar[500],
                      }}
                    >
                      {carrier.carrier_name}
                    </Typography>
                    <Typography
                      variant="h1"
                      component="div"
                      sx={{
                        marginTop: "10px",
                        fontSize: "50px",
                        fontWeight: "600",
                        color: colors.profile[100], // 110
                      }}
                    >
                      {carrier.last_value}
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
                      <DraggableCarriers
                        carrier={carrier.carrier_name}
                        active_users={carrier.last_value}
                      />
                      <small>Updated 10/05/2023</small>
                    </Typography>
                  </div>
                </Box>
              </Grid>
            );
          })}
        </Grid>
    );
    return content;
  }
};

export default CarrierCard;
