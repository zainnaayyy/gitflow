import React from "react";
import { useGetUsersQuery } from "../../../features/users/userApiSlice";
import { Avatar, AvatarGroup, Tooltip, Box, useTheme } from "@mui/material";
import { useGetDjangoVoipExtensionsQuery } from "../../../features/asterisk/DjangoVoipEndpointsApiSlice";
import { useGetChannelsActivityQuery } from "../../../features/stasis/StasisActivity";
import { makeStyles } from "@mui/styles";
import { tokens } from "../../../theme";

const BridgeMonitorStackInsertAvatar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: users, isLoading, isSuccess } = useGetUsersQuery();

  const {
    data: extensions,
    isLoading: extensionIsLoading,
    isSuccess: extensionIsSuccess,
  } = useGetDjangoVoipExtensionsQuery();

  console.log('extensions:', extensions)

  const {
    data: channels,
    isLoading: channelsIsLoading,
    isSuccess: channelsIsSuccess,
  } = useGetChannelsActivityQuery(undefined, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });
  console.log('CJAMMELELS:', channels)

  const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: '#252b32',
      fontSize: '16px',
    },
  }));

  const classes = "";

  const InsertExtToBridge = (extension) => {
    console.log('channels', channels)
  }

  const ActiveUsers = (extension) => {
    const ActiveUser = users && users.find((user) => user.extension == extension)
    return ActiveUser['user']
      
  }

  const RetrieveActiveExtensions = (extension, index, channels) => {
    const ActiveChannels = channels && channels.find((channel) => channel.extension == extension);
      
      let content;

      if (ActiveChannels) {
        content = (
          <Tooltip key={index} title={ActiveUsers(extension)} arrow classes={{ tooltip: classes.customTooltip }}>
            <Avatar onClick={InsertExtToBridge(ActiveChannels['extension'])} alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
          </Tooltip>
        )
      }
      return content;
  };

  let content;

  if (isLoading) {
    content = <Box>"Loading Data"</Box>;
  } else if (isSuccess) {
    content = (
      <AvatarGroup max={20}>
        {/* E */}
        {extensions &&
          extensions.map((extension, index) => {
            return RetrieveActiveExtensions(extension.extension, index, channels);
          })}
      </AvatarGroup>
    );
  }
  return content;
};

export default BridgeMonitorStackInsertAvatar;
