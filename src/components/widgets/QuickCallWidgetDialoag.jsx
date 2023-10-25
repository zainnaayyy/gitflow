import React from "react";
import {
  useGetUsersQuery,
  useGetOtherUsersQuery,
} from "../../features/users/userApiSlice";
import { Avatar, Tooltip, Box, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";

import PhoneIcon from "@mui/icons-material/Phone";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSelector } from "react-redux";
import {
  registeredStatus,
  inCallStatus,
} from "../../features/dialer/dialerSlice";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetChannelsActivityQuery } from "../../features/stasis/StasisActivity";
import {
  useCreateBridgeMutation,
  useAddChannelToBridgeMutation,
} from "../../features/asterisk/asteriskApiSlice";

const QuickCallWidget = ({ colors }) => {
  const [open, setOpen] = React.useState(false);

  const { data: profiles, isLoading, isSuccess } = useGetUsersQuery();
  const { data: otherProfiles } = useGetOtherUsersQuery();
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

  const [createBridge] = useCreateBridgeMutation();
  const [addChannelToBridge] = useAddChannelToBridgeMutation();

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RegisteredCheck = () => {
    if (
      registeredStatusSelector["payload"]["dialer"]["valueRegisteredStatus"] ===
      true
    ) {
      return true;
    }
  };

  const inCallCheck = () => {
    if (
      inCallStatusSelector["payload"]["dialer"]["valueInCallStatus"] === true
    ) {
      return true;
    }
  };

  const currentProfile =
    profiles &&
    profiles.find((profile) => profile["id"] === currentUserIdSelector);

  const callUser = async (channelId, channelIdCurrentProfile) => {
    try {
      const new_bridge = await createBridge();
      // addChannelToBridge([new_bridge["data"]["id"], channelId["channel_id"]]);
      // addChannelToBridge([new_bridge["data"]["id"],channelIdCurrentProfile["channel_id"]]);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const confirmCall = (channelId, channelIdCurrentProfile) => {
    setOpen(true)
  }

  const onlineUser = (profile) => {
    const channelId =
      channels &&
      channels.find((channel) => channel["extension"] == profile.extension);

    const channelIdCurrentProfile =
      channels &&
      channels.find(
        (channel) => channel["extension"] == currentProfile["extension"]
      );

    if (channelId) {
      return (
        <Box>
          <Box>
            <Tooltip title="Open Dialer" className="my-tooltip">
              <PhoneIcon
                onClick={() => confirmCall(channelId, channelIdCurrentProfile)}
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
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      );
    }
  };

  let content;

  if (isLoading) {
    content = <Box>"Loading Data"</Box>;
  } else if (isSuccess) {
    content = (
      <Box>
        <Stack spacing={2} direction="row">
          <Grid container spacing={2}>
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
                          <Box sx={{ mt: 1 }}>
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
      </Box>
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
