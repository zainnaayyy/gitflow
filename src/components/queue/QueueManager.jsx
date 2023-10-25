import React from "react";
import { Box, Card, Grid, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import {
  useGetQueueQuery,
} from "../../features/asterisk/queue/queueApiSlice";

const QueueManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: queues,
    isSuccess: queueSuccess,
    isLoading,
  } = useGetQueueQuery();

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
                <Grid item xs={12} md={12}>
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
                                >
                                  [{queue.queue_name}]
                                </Typography>
 
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
