import React from "react";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const UsersCard = ({ colors, users, isLoading, isSuccess }) => {

  const GetUserImage = (endpoint) => {

    let avatarUrl = "";
    if (isSuccess) {
      avatarUrl = `https://back.iqbot.live/media/image/avatar/${endpoint["user"]}.png?${Date.now()}`;
    }
    return avatarUrl

  }

  let content;

  if (isLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (isSuccess) {
    content = (
      <Box>
        <Box sx={{ fontSize: "20px" }}>
        </Box>
        <Grid container spacing={2}>
          {users &&
            users.map((endpoint) => {
              return (
                <Grid item xs={6} md={2} key={endpoint.id}>
                  <Box
                    m="0 0 -20px 0"
                    backgroundColor={colors.primary[710]}
                    className="card-dash card-shadow-2"
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
                          src={GetUserImage(endpoint)}
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
                      {endpoint.first_name}
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

                        {endpoint.user_role}
                        {/*

                        {channels &&
                          channels.map((channel, index2) => {
                            let content;
                            if (
                              channel["caller"]["number"] ===
                              endpoint["resource"]
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
                          */}
                          
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

export default UsersCard;
