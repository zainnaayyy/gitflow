import React from "react";
import { useGetUsersQuery, useGetOtherUsersQuery } from "../../features/users/userApiSlice";
import { Avatar, Tooltip, Box, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSelector } from "react-redux";
import {
  registeredStatus,
  inCallStatus,
} from "../../features/dialer/dialerSlice";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetChannelsActivityQuery } from "../../features/stasis/StasisActivity";
import { useCreateBridgeMutation, useAddChannelToBridgeMutation } from "../../features/asterisk/asteriskApiSlice";

const QuickCallWidget = ({ colors }) => {
  const { data: profiles, isLoading, isSuccess } = useGetUsersQuery();
  const {
    data: channels,
    isLoading: channelsIsLoading,
    isSuccess: channelsIsSuccess,
  } = useGetChannelsActivityQuery(undefined, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });

  const registeredStatusSelector = useSelector(registeredStatus);
  const inCallStatusSelector = useSelector(inCallStatus);
  const currentUserIdSelector = useSelector(selectCurrentId);

  const [ createBridge ] = useCreateBridgeMutation();
  const [ addChannelToBridge ] = useAddChannelToBridgeMutation();

  const StyledBadge = styled(Badge)(
    ({ theme, stateColor, stateRingColor, variant }) => ({
      position: "relative",
      "& .MuiBadge-badge": {
        backgroundColor: stateColor,
        color: stateColor,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation:
            variant === "dot" ? "ripple 1.2s infinite ease-in-out" : "none", // Apply animation only when variant is 'dot'
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: "calc(50% - 4px)", // Position the small ring at the center of the badge
        left: "calc(50% - 4px)",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: stateRingColor, // Set the color of the non-blinking dot here
        display: variant === "static" ? "block" : "none", // Display the static dot when variant is 'static'
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    })
  );

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

  const RegisteredCheck = () => {
    if (
      registeredStatusSelector["payload"]["dialer"]["valueRegisteredStatus"] ===
      true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const InCallCheck = () => {
    if (
      inCallStatusSelector["payload"]["dialer"]["valueInCallStatus"] === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const currentProfile = profiles && profiles.find((profile) => profile['id'] === currentUserIdSelector)

  const callUser = async (channelId, channelIdCurrentProfile) => {
    try {
      const new_bridge = await createBridge();
      if (InCallCheck() === false){
        alert('YOU ARE NOT LOGGED IN, LOG AND ENTER THE MATRIX BEFORE CALL')
      }
      if (RegisteredCheck() === false){

        alert('YOU ARE NOT REGISTERED, ENTER THE MATRIX BEFORE CALL !')

      } else {

        // console.log('channelOutro:', new_bridge['data']['id'], channelId['channel_id'])
        // console.log('channelMesmo:', new_bridge['data']['id'], channelIdCurrentProfile['channel_id'])

        await addChannelToBridge([new_bridge['data']['id'], channelId['channel_id']])
        await addChannelToBridge([new_bridge['data']['id'], channelIdCurrentProfile['channel_id']])

        alert(`The bridge was created with ${channelId['channel_id']} and ${channelIdCurrentProfile['channel_id']}`)
        
      }

    } catch (error) {
      console.log('error:', error)
    }
  }

  const onlineUser = (profile) => {
    const channelId = channels && channels.find(
      (channel) => channel["extension"] == profile.extension
    );

    const channelIdCurrentProfile = channels && channels.find(
      (channel) => channel["extension"] == currentProfile['extension']
    );

    if (channelId) {
      return (
        <Box>
          <Tooltip title="Open Dialer" className="my-tooltip">
            <PhoneIcon
              onClick={() => callUser(channelId, channelIdCurrentProfile)}
              variant="contained"
              fontSize="medium"
              sx={{
                cursor: "pointer",
                color: colors.icons[100],
                mt: "2px",
              }}
            />
          </Tooltip>
        </Box>
      );
    }
  };

  const otherProfiles = profiles && profiles.filter(profile => profile.id !== currentUserIdSelector);

  let content;

  if (isLoading) {
    content = <Box>"Loading Data"</Box>;
  } else if (isSuccess) {
    content = (
      <Stack spacing={1} direction="row" sx={{ mt: 1}}>
        <Grid container spacing={1}>
          {otherProfiles &&
            otherProfiles.map((profile, index) => {
              return (
                <Grid item key={index} xs={6} md={12}>
                  <Item>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          
                          stateColor="#44b700" // Set your desired blinking dot color here
                          variant="dot" // Use "dot" to have the blinking point
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={`https://back.iqbot.live/media/image/avatar/${profile.user}.png`}
                          />
                        </StyledBadge>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <Box>
                          {profile.user}
                          <br />
                          {profile.extension}
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Box sx={{ mt: 1 }}>{onlineUser(profile)}</Box>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    );
  }

  return content;
};

export default QuickCallWidget;

/*

    <Tooltip title={profile.first_name} arrow>
        <Avatar alt="Remy Sharp" src={`https://back.iqbot.live/media/avatars/${profile.user}.png?${Date.now()}`} />
        </Tooltip>

*/
