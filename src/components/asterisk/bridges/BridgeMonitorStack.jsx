import React from "react";
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
import { LinearProgress } from "@mui/material";
import { withStyles } from "@mui/styles";

import { useGetBridgedChannelsActivityQuery } from "../../../features/stasis/StasisActivity";
import BridgeMonitorStackInsertAvatar from "./BridgeMonitorStackInsertAvatar";
import BridgeMonitorStackTooltipChannels from "./BridgeMonitorStackTooltipChannels";
import { useGetUsersQuery } from "../../../features/users/userApiSlice";
import BridgeMonitorStackTooltipConference from "./BridgeMonitorStackTooltipConference";

const BridgeMonitorStack = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: users } = useGetUsersQuery();

  const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: colors.tooltip[100],
      fontSize: "14px",
      width: '200px',
      border: '1px solid #5a5a5a', // MAKE COOOOLLLOOOOORSSSSS. RESPECTIVE
      borderRadius: '8px',
    },
  }));

  const CustomLinearProgress = withStyles((theme) => ({
    root: {
      borderRadius: 10,
      height: 10,
    },
    bar: {
      borderRadius: 10,
      height: 10,
    },
    barColorPrimary: {
      backgroundColor: colors.icons["100"],
    },
  }))(LinearProgress);

  const {
    data: bridgedChannels,
    isLoading: bridgedChannelsIsLoading,
    isSuccess: bridgedChannelsIsSuccess,
  } = useGetBridgedChannelsActivityQuery(undefined, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });

  const chipStyleProfile = {
    backgroundImage: colors.gradient[500], // Replace with your desired gradient colors
    color: '#fff', // Replace with the text color that fits the gradient background
    margin: '-10px',
    fontSize: '14px',
  };

  const chipStyleProfileExternal = {
    backgroundImage: colors.gradient[100], // Replace with your desired gradient colors
    color: '#fff', // Replace with the text color that fits the gradient background
    margin: '-10px',
    fontSize: '14px',
  };

  const extensionProfile = (bridge_ext) => {
    const profileUser =
      users && users.find((user) => user.extension === bridge_ext);
    const profileUserExternal =
      users && users.find((user) => user.phone_number === bridge_ext);

    if (profileUser) {
      return <div>
        <Chip style={chipStyleProfile} className="card-shadow shadow" label={profileUser.user}  />
      </div>;
    } else if (profileUserExternal) {
      return <div>
        <Chip style={chipStyleProfileExternal} className="card-shadow shadow" label={profileUserExternal.user} />
      </div>;
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",

    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgb(51, 59, 80, 0.42)",
    },
  }));

  const ProfileCompleted = () => 20;

  let content;

  if (bridgedChannelsIsLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (bridgedChannelsIsSuccess) {
    content = (
      <Box sx={{ mt: 3 }}>
        <Stack spacing={1} direction="row">
          <Grid container spacing={2}>
            <Grid item xs={10} md={10}>
              <Item>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <Box sx={{ fontSize: '16px', fontWeight: '600'}}>ID</Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ fontSize: '16px', fontWeight: '600'}}>Channels</Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ fontSize: '16px', fontWeight: '600'}}>
                      Lead Progress
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ fontSize: '16px', fontWeight: '600'}}>
                      Elapsed Time
                    </Box>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={2} md={2}>
              <Item>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center'}}>
                  <Grid item xs={3} md={3} >
                    <Tooltip title="Action Buttons">
                      <Box sx={{ fontSize: '16px', fontWeight: '600'}}>Actions</Box>
                    </Tooltip>
                  </Grid>
                
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Stack>

        {bridgedChannels.map((bridge, index) => {
          return (
            <Box key={index} sx={{ mt: 2, width: "100%" }}>
              <Stack spacing={1} direction="row">
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                          <Box fontSize={15}>{bridge.id}</Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid container spacing={2}>
                            {bridge.extensions_list.length <= 2 ?  
                            
                            bridge.extensions_list.map(
                              (bridged_ext, index) => {
                                return (
                                  <Grid item xs={5} md={6} key={index}>
                                    {/* Refactor, put Tooltip inside component BridgeMonitorStackTooltipChannels*/}
                                    <Tooltip
                                      sx={{ cursor: "pointer" }}
                                      title={
                                        <BridgeMonitorStackTooltipChannels
                                          bridged_ext={bridged_ext}
                                          users={users}
                                          bridge={bridge}
                                          colors={colors}
                                        />
                                      }
                                      arrow
                                      className="bg-[#FFF] text-sm w-[200px] border-[#5a5a5a] rounded-lg"
                                      placement="top"
                                    >
                                      <Box>{extensionProfile(bridged_ext)}</Box>
                                    </Tooltip>
                                  </Grid>
                                );
                              }
                            )
                            : 
                            <Grid item xs={5} md={12} key={index}>
                              <Box>
                                <BridgeMonitorStackTooltipConference bridge={bridge} colors={colors} />
                              </Box>
                            </Grid>
                          }
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} key={index}>
                          <div className="linear-progress">
                            <Grid container spacing={2}>
                              <Tooltip
                                title="Tooltip"
                                sx={{ cursor: "pointer" }}
                                arrow
                                className="bg-[#FFF] text-sm w-[200px] border-[#5a5a5a] rounded-lg"
                                placement="top"
                              >
                                <Grid item xs={9} md={9}>
                                  <CustomLinearProgress
                                    sx={{ mt: 1 }}
                                    className="card-shadow shadow"
                                    variant="determinate"
                                    value={ProfileCompleted()}
                                  ></CustomLinearProgress>
                                </Grid>
                              </Tooltip>
                              <Grid item xs={3} md={3}>
                                <div className="label card-shadow shadow">
                                  {ProfileCompleted()}%
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box fontSize={15}>00:00:00</Box>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <Tooltip
                            title={
                              <BridgeMonitorStackInsertAvatar
                                bridgeCurrent={bridge}
                              />
                            }
                            placement="left"
                          >
                            <PersonAddAlt1Icon
                              sx={{
                                cursor: "pointer",
                                color: colors.icons[400],
                                margin: -1,
                              }}
                              fontSize="small"
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Tooltip title="Snoop Call" placeholder="Test">
                            <HeadphonesIcon
                              sx={{
                                cursor: "pointer",
                                color: colors.icons[400],
                                margin: -1,
                              }}
                              fontSize="small"
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <MicIcon
                            sx={{
                              cursor: "pointer",
                              color: colors.icons[400],
                              margin: -1,
                            }}
                            fontSize="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CloseIcon
                            sx={{
                              cursor: "pointer",
                              color: colors.icons[400],
                              margin: -1,
                            }}
                            fontSize="small"
                          
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

/* Fouth Attempt => CHANGE APPROACH AND TESTING DIRECT FROM THE BACKEND, SINCE SINCRONISM ERROR WITH ASTERISK IDENTIFIED

  let brichans_final = [];

  if (bridgeIsLoading){
    setTimeout(() => {
      console.log('BRIDGE LOADING')
    }, bridgeLoadingDelay)
  }
  else if (bridgeIsSuccess){
    console.log('1')
    bridges.map((bridge) => {
      console.log('2')
      if(bridge["channels"].length == 0 ) {
        console.log('3')
        let brichan_new_obj = [];
        console.log('4')
        brichan_new_obj = Object.assign({}, bridge, { extensions: [] });
        console.log('5')
        brichans_final.push(brichan_new_obj)
        console.log('6')
      } else {
        let extensions_list = [];
        let brichan_new_obj = [];
        console.log('7')
        bridge["channels"].map((channel) => {
          console.log('8')
          if (channelsIsLoading){
            console.log('CHANNELISLOADIIIING')
          }
          else if(channelsIsSuccess) { // O problema é aqui, esquipando porque nao tava channelsIsSuccess
                                  // Pra simular, ligar e esperar a tela branca, entao relogar tendo uma bridge com canal dentro
                                  // fazer algo caso o channel demore....
            console.log('9')

            console.log('channels:', channels)
            console.log('channel:', channel)

            const bridge_channels = channels.find((item) => item["id"] === channel); // THIS IS GIVING AN ERROR
            console.log('10')
            console.log('bridge_channels:', bridge_channels)
            extensions_list.push(bridge_channels["caller"]["number"]);
            console.log('11')
            brichan_new_obj = Object.assign({}, bridge, { extensions: extensions_list });
            console.log('brichan_new_obj:', brichan_new_obj)
          }
          console.log('12')
          brichans_final.push(brichan_new_obj)
          console.log('brichans_final:', brichans_final)
        })
      }
    })
  }
  
  const bridgedChannels = (bridge) => {
    console.log('AQUII ANTS', bridge)
    if (bridge['extensions'].length == 0) {
      console.log('AQUII DEPOS')
      return (<Box>Naaaada</Box>)
    } else {
      return(
        bridge['extensions'].map((bridge_ext, index) => {
          return (
            <Grid item xs={5} md={2} key={index}>
            <Tooltip title={'Tooltip'} arrow classes={{ tooltip: classes.customTooltip }} placement="bottom" >
              <Box>{bridge_ext}</Box>
            </Tooltip>
          </Grid>
          )
        })
      )
    }
  }

  console.log(brichans_final)

  */

/*  Third Attempt

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
          <Tooltip title={'Tooltip'} arrow classes={{ tooltip: classes.customTooltip }} placement="bottom" >
            <Box>{bridge_ext}</Box>
          </Tooltip>
        </Grid>
        )
      })
    )
  }

  */

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
