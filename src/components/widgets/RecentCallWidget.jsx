import React, { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useGetOtherUsersQuery,
} from "../../features/users/userApiSlice";
import { Avatar, Tooltip, Box, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  useGetCallsActivityQuery,
  useGetChannelsActivityItemDetailQuery,
} from "../../features/stasis/StasisActivity";
import { CallsItemsDialog } from "../asterisk/calls/CallsItemsDialog";

const RecentCallWidget = ({ colors }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchKey, setSearchKey] = useState("");

  const { data: calls, refetch } = useGetCallsActivityQuery({
    page,
    pageSize,
    search: searchKey,
  });

  useEffect(() => {
    refetch()
  }, [])

  const {
    data: channel_item,
    isLoading,
    isSuccess,
  } = useGetChannelsActivityItemDetailQuery(); // '{ itemId }'

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",

    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
  }));

  return (
    <Stack spacing={2} direction="row" sx={{ mt: 1 }}>
      <Grid container spacing={1}>
        {calls &&
          calls["results"].map((call, index) => {
            return (
              <Grid key={index} item xs={6} md={12}>
                <Item>
                  <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Grid item xs={6} md={5}>
                      <Box>Call ID</Box>
                    </Grid>
                    <Grid item xs={6} md={5}>
                      {call.id}
                    </Grid>

                  </Grid>
                </Item>
              </Grid>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default RecentCallWidget;
