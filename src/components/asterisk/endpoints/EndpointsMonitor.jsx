import React, { useState } from "react";
import { Box, Card, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import {
  useGetDjangoVoipExtensionsQuery,
  useGetDjangoVoipDIDsQuery,
} from "../../../features/asterisk/DjangoVoipEndpointsApiSlice";
import { useGetChannelsActivityQuery } from "../../../features/stasis/StasisActivity";

const EndpointsMonitor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: extensions,
    isLoading: extensionIsLoading,
    isSuccess: extensionIsSuccess,
  } = useGetDjangoVoipExtensionsQuery();

  const { data: dids, isLoading, isSuccess } = useGetDjangoVoipDIDsQuery();

  const {
    data: channels,
    isLoading: channelsIsLoading,
    isSuccess: channelsIsSuccess,
  } = useGetChannelsActivityQuery(undefined, {pollingInterval: 10000, refetchOnMountOrArgChange: true});

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

  const RetrieveActiveExtensions = (extension, index, channels) => {

    const ActiveChannels = channels && channels.find((channel) => channel.extension == extension)

    let content;

    if (ActiveChannels){
      content = (
      <Grid item key={index} xs={6} md={2}>
        <Item >{extension} - Online </Item>
      </Grid>
      )
    } else if (!ActiveChannels) {
      content = (
        <Grid item key={index} xs={6} md={2}>
          <Item >{extension}</Item>
        </Grid>
        )
    }
    return content;
  }

  let content;

  if (extensionIsLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (extensionIsSuccess) {
    content = (
      <Box>
        <Box sx={{ mt: 2, width: "100%" }}>
          <Stack spacing={2} direction="row">
            <Grid container spacing={2}>
              {extensions &&
                extensions.map((extension, index) => {
                  return (
                    RetrieveActiveExtensions(extension.extension, index, channels)
                  );
                })}
            </Grid>
          </Stack>
        </Box>
        <Box sx={{ mt: 2, width: "100%", color: colors.grey[200] }}>
          <h3> Telnyx Encapsulated Line Trunks </h3>
          <Stack spacing={2} direction="row">
            <Grid container spacing={2}>
              {dids &&
                dids.map((did, index) => {
                  return (
                    <Grid item key={index} xs={6} md={2}>
                      <Item>{did.did}</Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Stack>
        </Box>
      </Box>
    );
  }

  return content;
};

export default EndpointsMonitor;
