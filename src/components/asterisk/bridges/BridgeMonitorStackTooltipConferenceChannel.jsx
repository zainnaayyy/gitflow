import React from "react";
import { useRemoveChannelFromBridgeMutation } from "../../../features/asterisk/asteriskApiSlice";
import { Box, Grid, Tooltip } from "@mui/material";
import EjectIcon from "@mui/icons-material/Eject";

const BridgeMonitorStackTooltipConferenceChannel = ({ bridged_ext, users, bridge }) => {
  // const bridgedUser = users.find((user) => user["extension"] === bridged_ext); delete

  console.log('BridgeMonitorStackTooltipConferenceChannel [[', bridged_ext, users, bridge)

  const [removeChannel] = useRemoveChannelFromBridgeMutation();

  const removeFromBridge = async (bridge, bridged_ext) => {
    // Need to refactor to keep more straight
    const bridgedChannelIndex = bridge["extensions_list"].indexOf(bridged_ext);
    const bridgedChannel = bridge["channels_list"][bridgedChannelIndex];
    try {
      await removeChannel([bridge["bridge_id"], bridgedChannel]);
      alert("Channel removed from bridge");
    } catch (e) {
      console.log("error::", e);
    }
  };

  const profileUser =
    users && users.find((user) => user.extension === bridged_ext);
  const profileUserExternal =
    users && users.find((user) => user.phone_number === bridged_ext);

  if (profileUser) {
    const avatarUrl = `https://back.iqbot.live/media/image/avatar/${profileUser["user"]}.png?${Date.now()}`;

    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #3c9dfa",
              }}
            >
              <img
                alt="profile-user"
                width="50px"
                src={avatarUrl}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={8}>
            <Box sx={{ mt: 1 }}>
              {profileUser["first_name"]} {profileUser["last_name"]}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Box>{profileUser["extension"]}</Box>
              </Grid>
              <Grid item xs={6} md={4}>
              <Box>
                <Tooltip title="Eject from Bridge">
                  <EjectIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => removeFromBridge(bridge, bridged_ext)}
                  />
                </Tooltip>
              </Box>
            </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}></Grid>
          <Grid item xs={6} md={8}></Grid>
        </Grid>
      </Box>
    );

  } else if (profileUserExternal) {
    const avatarUrl = `https://back.iqbot.live/media/image/avatar/${profileUserExternal["user"]}.png?${Date.now()}`
   
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #3c9dfa",
              }}
            >
              <img
                alt="profile-user"
                width="50px"
                src={avatarUrl}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={8}>
            <Box sx={{ mt: 1 }}>
              {profileUserExternal["first_name"]} {profileUserExternal["last_name"]}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Box>{profileUserExternal["phone_number"]}</Box>
              </Grid>
              <Grid item xs={6} md={4}>
              <Box>
                <Tooltip title="Eject from Bridge">
                  <EjectIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => removeFromBridge(bridge, bridged_ext)}
                  />
                </Tooltip>
              </Box>
            </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4}></Grid>
          <Grid item xs={6} md={8}></Grid>
        </Grid>
      </Box>
    );
  }
};

export default BridgeMonitorStackTooltipConferenceChannel;
