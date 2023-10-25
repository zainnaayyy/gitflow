import React from "react";
import { Box, Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

import {
  useGetChannelsQuery,
  useGetEndpointsQuery,
  useGetBridgesQuery,
} from "../../../features/asterisk/asteriskApiSlice";

import { useGetUsersQuery } from "../../../features/users/userApiSlice";
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

  console.log('endpoints', endpoints)

  const {
    data: users,
    isLoading: usersIsLoading,
    isSuccess: usersIsSuccess,
  } = useGetUsersQuery();

  console.log('users', users)

  useEffect(() => {});

  let content;

  if (endpointIsLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (endpointIsSuccess) {
    content = (
      <Box>
        <Box sx={{ mt: 7, fontSize: '20px'}}> Get Direct From Asterisk, Use the API Above with This</Box>
      <Grid container spacing={2}>
        {endpoints &&
          endpoints.map((endpoint, index) => {
            return (
              <Grid item xs={6} md={2} key={endpoint.id}>
                <Box
                  m="0 0 -20px 0"
                  backgroundColor={colors.primary[710]}
                  className="card-dash card-shadow card-animation"
                  height={200}
                  width={"100%"}
                >
                  <div className="content-chart-card">
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        fontSize: "26px",
                        fontWeight: "600",
                        mt: 3,
                        pt: 2,
                        color: colors.contentSideBar[500],
                      }}
                    >
                      <img
                        alt="profile-user"
                        width="52px"
                        height="52px"
                        src={`../../assets/user.png`}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                      />
                    </Typography>
                    <Typography
                      variant="h1"
                      component="div"
                      sx={{
                        mt: 1,
                        mb: 1,
                        fontSize: "20px",
                        fontWeight: "400",
                        color: colors.profile[100], // 110
                      }}
                    >
                      {users &&
                        users.map((user, index2) => {
                          if (user.extension === endpoint.resource) {
                            return <Box key={index2}>{user.first_name}</Box>;
                          }
                        })
                      }
                    </Typography>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: colors.contentSideBar[700],
                      }}
                    >
                      {" "}
                      {endpoint.resource}
                      {channels &&
                        channels.map((channel, index2) => {
                          let content;
                          if (
                            channel["caller"]["number"] === endpoint["resource"]
                          ) {
                            content = (
                              <>
                              <DialerSipIcon
                                key={index2}
                                sx={{
                                  ml: 1,
                                  color: "#71FF33",
                                  fontSize: "18px",
                                }}
                              />
                              {channel["caller"]["number"]}
                              </>
                            );
                          }
                          return content;
                        })}
                    </Typography>
                  </div>
                </Box>
              </Grid>
            );
          })}
      </Grid>
      </Box>
    );
  }

  return content;
};

export default ChannelMonitor;

/*

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
                      color: colors.contentSideBar[500],
                      textAlign: "center",
                    }}
                  >
                    {users &&
                      users.map((user, index2) => {
                        if (user.extension === endpoint.resource) {
                          return <Box key={index2}>{user.first_name}</Box>;
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
                      color: colors.contentSideBar[500],
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
                      backgroundColor: colors.profile[100],
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

*/
