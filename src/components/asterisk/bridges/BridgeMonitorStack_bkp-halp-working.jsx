import React, { useState, useEffect } from "react";
import { Box, Grid, Tooltip, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MicIcon from "@mui/icons-material/Mic";
import { makeStyles } from "@mui/styles";

import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

import { useGetBridgesQuery } from "../../../features/asterisk/asteriskApiSlice";
import { useGetChannelsQuery } from "../../../features/asterisk/asteriskApiSlice";
import { useDeleteBridgeMutation } from "../../../features/asterisk/asteriskApiSlice";

import { useAddChannelToBridgeMutation } from "../../../features/asterisk/asteriskApiSlice";

import { useGetUsersQuery } from "../../../features/users/userApiSlice";

const BridgeMonitorStack = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: users, isSuccess: userIsSuccess  } = useGetUsersQuery();

  const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: '#252b32',
    },
  }));

  const {
    data: bridges_,
    isLoading,
    isSuccess,
  } = useGetBridgesQuery(undefined, {
    pollingInterval: 20000,
    refetchOnMountOrArgChange: true,
  });
  const [bridges, setBridges] = useState(bridges_);

  useEffect(() => {
    setBridges(bridges_);
  }, [setBridges, bridges_]);

  const [deleteBridge] = useDeleteBridgeMutation();

  const [createAddToBridge] = useAddChannelToBridgeMutation();

  const { data: channels,
     isLoading: channelsIsLoading,
      isSuccess: channelsIsSuccess,
      isError: channelsIsError,
      error
     } = useGetChannelsQuery();

  // More than one parameters must be encapsulated in an array to be sent to Slice.
  const addToBridgeFunc = (bridge_id, prompValue) => {
    createAddToBridge([bridge_id, prompValue]);
  };

  const addToBridgeBtn = (bridge_id) => {
    //PROMPT EXTENSION TO USER
    const prompValue = prompt("Enter Extension");

    //GET CHANNEL ID OF EXTENSION
    let channel_id;
    channels &&
      channels.map((channel) => {
        if (
          prompValue === channel["caller"]["number"] ||
          prompValue === channel["dialplan"]["exten"]
        ) {
          channel_id = channel["id"];
        }
        return null;
      });

    if (prompValue === null) {
      alert("You Clicked The Cancel Button");
    } else if (prompValue === "") {
      alert("You Didnt Type Anything");
    } else {
      // EXECUTE FUNCTION WITH EXTENSION NUMBER AND CHANNEL ID
      addToBridgeFunc(bridge_id, channel_id);
    }
  };

  const deleteBridgeFunc = (bridge_id) => {
    deleteBridge(bridge_id);
  };

  // Get the orginal bridge object, iterate between channels_id matching with extensions and returning 
  // a new object with added extensions "key: value" with bridged extensions
  let brichans_final = [];
  bridges &&
    bridges.map((bridge) => {
      let extensions_list = [];
      let brichan_new_obj = [];
      bridge["channels"].map((channel) => {
        if(channelsIsSuccess) {
          const bridge_channels = channels.find((item) => item["id"] === channel); // THIS IS GIVING AN ERROR
          extensions_list.push(bridge_channels["caller"]["number"]);
          brichan_new_obj = Object.assign({}, bridge, { extensions: extensions_list });
        } else if (channelsIsError){
          console.log('ERROR:,', error)
        }
      });
      brichans_final.push(brichan_new_obj)
    });
  
  const bridgedChannels = (bridge) => {
    return(
      bridge['extensions'].map((bridge_ext, index) => {
        return (
          <Grid item xs={5} md={2} key={index}>
          <Tooltip title={'Tooltip'} arrow className="bg-[#252b32]" placement="bottom" >
            <Box>{bridge_ext}</Box>
          </Tooltip>
        </Grid>
        )
      })
    )
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",

    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgb(51, 59, 68, 0.42)",
    },
  }));

  let content;

  if (isLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (isSuccess) {
    content = (
      <Box>
        {bridges &&
          brichans_final.map((bridge, index) => {
            return (
              <Box key={index} sx={{ mt: 2, width: "100%" }}>
                <Stack spacing={2} direction="row">
                  <Grid container spacing={2}>
                    <Grid item xs={10} md={10}>
                      <Item>
                        <Grid container spacing={2}>
                          <Grid item xs={1} md={4}>
                            <Box fontSize={15}>{bridge.id}</Box>
                          </Grid>
                            {bridgedChannels(bridge)} 
                        </Grid>
                      </Item>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Item>
                        <Grid container spacing={2}>
                          <Grid item xs={3} md={3}>
                            <PersonAddAlt1Icon
                              sx={{
                                cursor: "pointer",
                                color: colors.icons[400],
                                margin: -1,
                              }}
                              fontSize="small"
                              onClick={() => addToBridgeBtn(bridge.id)}
                            />
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <HeadphonesIcon
                              sx={{
                                cursor: "pointer",
                                color: colors.icons[400],
                                margin: -1,
                              }}
                              fontSize="small"
                            />
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <MicIcon
                              sx={{
                                cursor: "pointer",
                                color: colors.icons[400],
                                margin: -1,
                              }}
                              fontSize="small"
                            />
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <CloseIcon
                              sx={{
                                cursor: "pointer",
                                color: colors.icons[400],
                                margin: -1,
                              }}
                              fontSize="small"
                              onClick={() => deleteBridgeFunc(bridge.id)}
                            />
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            );
          })}
      </Box>
    );
  }

  return content;
};

export default BridgeMonitorStack;



/* Second Attempt

  const externalCall = (number) => {
    console.log('number', number)
  }

  const selectedUser = (extension) => {
    if (userIsSuccess){
      const user_qs = users.find(user => user.extension === extension)
      return(`${user_qs.first_name} - ${user_qs.extension}`)  // Error when data dosent exists, FIX IT
    }
  }

  // The bridge carry just the channels name, so we need to
  const bridgedChannels = (channels_in_bridge) => {
    console.log('channels_in_bridge', channels_in_bridge)
    return channels_in_bridge.map((channel_in_bridge, index) => {
      const channel_ = channels && channels.find((item) => item['id'] === channel_in_bridge || item['dialplan']['context'] == 'agent');
      console.log('channelsSSS:', channels)

      let content;

      if (!channel_) {
        content = (
          <Grid item xs={5} md={2} key={index}>
            <Tooltip title={`NAO TEM`} arrow classes={{ tooltip: classes.customTooltip }} placement="bottom">
              <Chip style={{ height: "20px", backgroundColor: colors.icons["300"] }} label={externalCall(channel_in_bridge)}></Chip>
            </Tooltip>
          </Grid>
        );
      } else {
        content = (
          <Grid item xs={5} md={2} key={index}>
            <Tooltip title={`TEM`} arrow classes={{ tooltip: classes.customTooltip }} placement="bottom" >
              <Chip style={{ height: "20px", backgroundColor: colors.icons["300"] }} label={selectedUser(channel_["caller"]["number"])}></Chip>
            </Tooltip>
          </Grid>
        );
      }
      return content;
    });
  };
*/

/* First Attempt
  
    const selectedUser = (extension) => {
    if (userIsSuccess){
      const user_qs = users.find(user => user.extension === extension)
      return(`${user_qs.first_name} - ${user_qs.extension}`)  // Error when data dosent exists, FIX IT
    }
  }

  // Display the participating channels in the bridge
  const bridgedChannels = (bridge) => {
    return bridge.map((bridge_instance) => {
      return (
        channels &&
        channels.map((channel, index2) => {
          if (bridge_instance === channel["id"]) {
            return (
              <Grid item xs={5} md={2} key={index2}>
                <Tooltip title={`Information About Agent ${channel["caller"]["number"]}`} arrow classes={{ tooltip: classes.customTooltip }} placement="bottom">
                  <Chip style={{ height: '20px', backgroundColor: colors.icons['300'] }} label={selectedUser(channel["caller"]["number"])}></Chip>
                </Tooltip>
              </Grid>
            );
          }
        })
      );
    });
  };
  */
