import React from "react";
import { Box, Card, Grid, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";

import {
  useGetQueueQuery,
  useGetPositionQuery,
} from "../../features/asterisk/queue/queueApiSlice";

const QueueManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: queues,
    isSuccess: queueSuccess,
    isLoading,
  } = useGetQueueQuery();

  const { data: positiones, isSuccess: positionesSuccess } =
    useGetPositionQuery(undefined, {
      pollingInterval: 4000,
      refetchOnMountOrArgChange: true,
    });

  console.log("queues");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: "16px",
    textAlign: "center",
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
    marginBottom: "20px;",
    color: theme.palette.text.secondary,
  }));

  let content;

  if (isLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (queueSuccess) {
    content = (
      <Box>
        <Grid container spacing={2}>
          {queues &&
            queues.map((queue, index) => {
              return (
                <Grid item xs={3} md={3}>
                  <Box key={index} sx={{ mt: 2, width: "100%" }}>
                    <Stack spacing={2} direction="row">
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Item>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                <Typography
                                  variant="h4"
                                  color={colors.grey[200]}
                                  sx={{ mb: 4 }}
                                >
                                  {queue.queue_name}
                                </Typography>
                                {positiones &&
                                  positiones.map((positione) => {
                                    return (
                                      <Item2>
                                        <Box fontSize={15}>
                                          {positione.caller_number}
                                        </Box>
                                        <Box fontSize={12}>
                                          {positione.channel_id}
                                        </Box>
                                      </Item2>
                                    );
                                  })}
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    );
  }

  return content;
};

export default QueueManager;
