import React from "react";
import { Avatar, AvatarGroup, Tooltip, Box, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetUsersQuery,
  UserApiSlice,
} from "../../../features/users/userApiSlice";
import { useGetChannelsActivityQuery } from "../../../features/stasis/StasisActivity";
import { tokens } from "../../../theme";
import { useAddChannelToBridgeMutation } from "../../../features/asterisk/asteriskApiSlice";

import { selectCurrentId } from "../../../features/auth/authSlice";
import { useGetUserQuery } from "../../../features/users/userApiSlice";

const BridgeMonitorStackInsertAvatar = (bridge) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  const InvalidateUsers = () => {
    dispatch(UserApiSlice.util.invalidateTags(["Users"]));
  };

  const { data: users, isLoading, isSuccess } = useGetUsersQuery();

  const {
    data: channels,
    isLoading: channelsIsLoading,
    isSuccess: channelsIsSuccess,
  } = useGetChannelsActivityQuery(undefined, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });

  const user_id = useSelector(selectCurrentId);
  const { data: profile } = useGetUserQuery(user_id);

  const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: '#252b32',
      fontSize: "16px",
    },
  }));

  const [createAddToBridge] = useAddChannelToBridgeMutation();

  const handleClick = (channel_id, bridge) => {
    createAddToBridge([ bridge["bridgeCurrent"]["bridge_id"],channel_id ]);

    // InvalidateUsers()  // Invalidate Tags Not Working - Check
  };

  const RetrieveActiveUsers = (channel, index) => {

    let activeUser;

    if (channel.extension) {
      activeUser = users && users.find((user) => user.extension == channel.extension);
    } else if (channel.caller_number) {
      activeUser = users && users.find((user) => user.phone_number == channel.caller_number);
    }
    
      

    const avatarUrl = `https://back.iqbot.live/media/image/avatar/${ activeUser && activeUser["user"]}.png?${Date.now() }`;

    const CurrentChannelInBridge = bridge['bridgeCurrent']['extensions_list'].find((channelinbridge) => channelinbridge === activeUser.extension)

    console.log('activeUser.extension===', activeUser.extension)
    console.log('CurrentChannelInBridge===', CurrentChannelInBridge)

    if ( activeUser.extension !== CurrentChannelInBridge) {

      console.log('REPEAT X TIMES')

      content = (
        <Tooltip
          key={index}
          title={activeUser["user"]}
          arrow
          sx={{ cursor: 'pointer'}}
          className="text-base bg-[#252b32]"
          onClick={() => handleClick(channel.channel_id, bridge)}
        >
          <Avatar alt="Avatar" src={avatarUrl} />
        </Tooltip>
      );
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
        {channels &&
          channels.map((channel, index) => {
            console.log('DENTRO DO MAP===')
            return RetrieveActiveUsers(channel, index);
          })}
      </AvatarGroup>
    );
  }
  return content;
};

export default BridgeMonitorStackInsertAvatar;
