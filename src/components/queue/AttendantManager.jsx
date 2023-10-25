import React from "react";
import { Box, Card, Grid, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import {
  useGetQueueQuery,
  useGetAttendantPositionQuery,
} from "../../features/asterisk/queue/queueApiSlice";

const AttendantManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: queues,
    isSuccess: queueSuccess,
    isLoading,
  } = useGetQueueQuery();

  const { data: positiones, isSuccess: positionesSuccess } =
      useGetAttendantPositionQuery(undefined, {
      pollingInterval: 10000,
      refetchOnMountOrArgChange: true,
    });

  console.log("Attendand:", positiones);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "16px",
    textAlign: "center",
    fontSize: '18px',
    color: theme.palette.text.secondary,
    /* 
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
    */
  }));

  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: colors.profile[100],
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    marginBottom: "8px;",
    color: theme.palette.text.secondary,
  }));

  let content;

  if (isLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (queueSuccess) {
    content = (
      <Box>
        <Grid item xs={12} md={12}>
          <Box sx={{ mt:2, mb: 1, width: "100%" }}>
            <Stack spacing={2} direction="row">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Item>Attendants</Item>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>

        {positiones &&
          positiones.map((positione, index) => {
            return (
              <Grid item xs={12} md={12}>
                <Box key={index} sx={{ width: "100%" }}>
                  <Stack spacing={2} direction="row">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Item2>
                          <Box fontSize={15}>{positione.extension}</Box>
                          <Box fontSize={12}>{positione.channel_id}</Box>
                        </Item2>
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
      </Box>
    );
  }

  return content;
};

export default AttendantManager;
