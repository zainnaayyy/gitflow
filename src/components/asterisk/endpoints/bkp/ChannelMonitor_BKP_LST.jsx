import React from "react";
import { Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

import {
  useGetChannelsQuery,
  useGetEndpointsQuery,
  useGetBridgesQuery,
} from "../../features/asterisk/asteriskApiSlice";

import { useGetUsersQuery } from "../../features/users/userApiSlice";
import { useEffect } from "react";

const ChannelMonitor = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: channels,
    isLoading: channelIsLoading,
    isSuccess: channelIsSuccess,
  } = useGetChannelsQuery();

  const {
    data: endpoints,
    isLoading: endpointIsLoading,
    isSuccess: endpointIsSuccess,
  } = useGetEndpointsQuery(undefined, { pollingInterval: 10000 });

  const {
    data: users,
    isLoading: usersIsLoading,
    isSuccess: usersIsSuccess,
  } = useGetUsersQuery();

  useEffect(() => {});

  let content;

  if (endpointIsLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (endpointIsSuccess) {
    content = (
      <Box display="flex" flexWrap="wrap" sx={{ mt: 2 }}>
        {endpoints && endpoints.map((endpoint, index) => {
          return (
            <Box key={index}>
              <Card 
                sx={{
                  maxWidth: 200,
                  height: 220,
                  backgroundColor: `${colors.primary[710]} !important`,
                  ml: 5,
                  width: 180,
                  mt: 2,
                }}
              >
                <CardMedia sx={{ mt: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="52px"
                      height="52px"
                      src={`../../assets/user.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: colors.contentCard[600],
                      textAlign: "center",
                    }}
                  >
                    {users &&
                      users.map((user) => {
                        if (user.extension === endpoint.resource) {
                          return <Box>{user.first_name}</Box>;
                        }
                      })}
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#71FF33",
                        textAlign: "center",
                      }}
                    >
                      {/*<span style={{ color: "#ffffff" }}>Status:</span> Disconnected*/}

                      {channels &&
                        channels.map((channel, index2) => {
                          let content;
                          if (
                            channel["caller"]["number"] === endpoint["resource"]
                          ) {
                            content = (
                              <DialerSipIcon
                                key={index2}
                                sx={{
                                  ml: 1,
                                  color: "#71FF33",
                                  fontSize: "18px",
                                }}
                              />
                            );
                          }
                          return content;
                        })}
                    </Typography>
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: colors.contentCard[600],
                      textAlign: "left",
                    }}
                  >
                    Exten:
                    <span
                      sx={{
                        fontSize: "26px",
                        fontWeight: "bold",
                        color: "#ffffff",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      {endpoint.resource}
                    </span>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    size="small"
                    sx={{
                      backgroundColor: colors.profile[400],
                      width: "80%",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                    className="btn-connect"
                  >
                    Connect
                  </Button>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    );
  }

  return content;
};

export default ChannelMonitor;
