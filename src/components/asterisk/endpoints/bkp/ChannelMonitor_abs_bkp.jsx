import React, { useState, useEffect } from "react";
import { Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DialerSipIcon from "@mui/icons-material/DialerSip";

import {
  useGetChannelsQuery,
  useGetBridgesQuery,
} from "../../../features/asterisk/asteriskApiSlice";

import { MergeAsteriskObjects } from "../../../helpers/MergeAsteriskObjects";

const ChannelMonitor = () => {
  const endpoints = MergeAsteriskObjects();
  console.log("endpoints_new:", endpoints);

  const {
    data: channels,
    isLoading: channelIsLoading,
    isSuccess: channelIsSuccess,
  } = useGetChannelsQuery();

  let content;

  content = (
    <Box display="flex" flexWrap="wrap" sx={{ mt: 2 }}>
      {endpoints.map((endpoint) => {
        return (
          <Box>
            <Card
              sx={{
                maxWidth: 200,
                backgroundColor: "#137abd",
                ml: 5,
                width: 180,
              }}
            >
              <CardMedia sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center">
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
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <Box>{endpoint.first_name}</Box>

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
                    <span style={{ color: "#ffffff" }}>Status:</span> Connected
                    {/* 
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
                      */}
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
                    color: "#ffffff",
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
                    backgroundColor: "#0e8e5f",
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

  return content;
};

export default ChannelMonitor;
