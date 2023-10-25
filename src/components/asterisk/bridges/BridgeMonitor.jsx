import { Box, Card, Snackbar } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState, useEffect } from "react";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import AddIcon from "@mui/icons-material/Add";

import { GridCloseIcon } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";

import { useGetBridgesQuery } from "../../features/asterisk/asteriskApiSlice";
import { useGetChannelsQuery } from "../../features/asterisk/asteriskApiSlice";
import { useDeleteBridgeMutation } from "../../features/asterisk/asteriskApiSlice";

import { useAddChannelToBridgeMutation } from "../../features/asterisk/asteriskApiSlice";

export const BridgeMonitor = () => {
  const { data: bridges_, isLoading, isSuccess } = useGetBridgesQuery(undefined, { pollingInterval: 4000, refetchOnMountOrArgChange: true });
  const [ bridges, setBridges ] = useState(bridges_)
  
  useEffect(() => {
    setBridges(bridges_)
  }, [setBridges, bridges_])

  const [ deleteBridge ] = useDeleteBridgeMutation();

  const [createAddToBridge] = useAddChannelToBridgeMutation();

  const { data: channels } = useGetChannelsQuery();

  const deleteBridgeFunc = (bridge_id) => {
    deleteBridge(bridge_id);
  }

  // Most than one parameters must be encapsulated in an array to be sent to Slice.
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
        if (prompValue === channel["caller"]["number"]) {
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

  let content;

  if (isLoading) {
    content = <Box>Loading Data from Asterisk ...</Box>;
  } else if (isSuccess) {
    content = (
      <Box display="flex" flexWrap="wrap" sx={{ mt: 2 }}>
        {bridges && bridges.map((bridge, index) => {
          if (bridge.channels.length === 0) {
            return (
              <Box key={index}>
                <Card
                  sx={{
                    maxWidth: 200,
                    ml: 5,
                    width: 180,
                    backgroundColor: "#DB4F4A",
                  }}
                >
                  <GridCloseIcon
                    onClick={() => deleteBridgeFunc(bridge.id)}
                    sx={{
                      float: "right",
                      fontSize: "20px",
                      mt: 1,
                      mr: 1,
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                  <CardMedia sx={{ display: "flex" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "18px",
                        mt: 5,
                        ml: 2,
                        textAlign: "left",
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      ID Bridge: {}
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "22px",
                          textAlign: "left",
                          fontWeight: "600",
                        }}
                      >
                        {bridge.id.slice(0, 8)}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "18px",
                          textAlign: "left",
                          color: "#ffffff",
                          fontWeight: "bold",
                        }}
                      >
                        Extensions: 0
                      </Typography>
                    </Typography>
                  </CardMedia>
                  <CardContent sx={{ display: "flex" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "13px",
                        textAlign: "left",
                        color: "#ffffff",
                      }}
                    >
                      No extensions connected...
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                    onClick={() => addToBridgeBtn(bridge.id)}
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
                      <AddIcon
                        sx={{ color: "#ffffff", fontSize: "22px" }}
                      />
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          } else if (bridge.channels.length === 1) {
            return (
              <Box key={index}>
                <Card
                  sx={{
                    maxWidth: 200,
                    ml: 5,
                    width: 180,
                    backgroundColor: "#ECB407",
                  }}
                >
                  <GridCloseIcon
                    onClick={() => deleteBridgeFunc(bridge.id)}
                    sx={{
                      float: "right",
                      fontSize: "20px",
                      mt: 1,
                      mr: 1,
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                  <CardMedia sx={{ display: "flex" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "18px",
                        mt: 5,
                        ml: 2,
                        textAlign: "left",
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      ID Bridge:
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "22px",
                          textAlign: "left",
                          fontWeight: "600",
                        }}
                      >
                        {bridge.id.slice(0, 8)}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "18px",
                          textAlign: "left",
                          color: "#ffffff",
                          fontWeight: "bold",
                        }}
                      >
                        Extensions: 1
                      </Typography>
                    </Typography>
                  </CardMedia>
                  <CardContent sx={{ display: "flex" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "16px",
                        textAlign: "left",
                        color: "#ffffff",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      204
                      <span style={{ color: "#71FF33", fontSize: "10px" }}>
                        Connected
                      </span>
                    </Typography>
                    <DialerSipIcon
                      sx={{
                        color: "#AF3F3B",
                        fontSize: "20px",
                        cursor: "pointer",
                        ml: 1,
                        mt: 1,
                      }}
                    />
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => addToBridgeBtn(bridge.id)}
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
                      <AddIcon
                        sx={{ color: "#ffffff", fontSize: "22px" }}
                      />
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          } else if (bridge.channels.length === 2) {
            return (
              <Box key={index}>
                <Card
                  sx={{
                    maxWidth: 200,
                    ml: 5,
                    width: 180,
                    backgroundColor: "#1E5245",
                  }}
                >
                  <GridCloseIcon
                    onClick={() => deleteBridgeFunc(bridge.id)}
                    sx={{
                      float: "right",
                      fontSize: "20px",
                      mt: 1,
                      mr: 1,
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                  <CardMedia sx={{ display: "flex" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "18px",
                        mt: 5,
                        ml: 2,
                        textAlign: "left",
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      ID Bridge:
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "22px",
                          textAlign: "left",
                          fontWeight: "600",
                        }}
                      >
                        {bridge.id.slice(0, 8)}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "18px",
                          textAlign: "left",
                          color: "#ffffff",
                          fontWeight: "bold",
                        }}
                      >
                        Extensions: 3
                      </Typography>
                    </Typography>
                  </CardMedia>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "16px",
                          textAlign: "left",
                          color: "#ffffff",
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        204
                        <span style={{ color: "#71FF33", fontSize: "10px" }}>
                          Connected
                        </span>
                      </Typography>
                      <DialerSipIcon
                        sx={{
                          color: "#AF3F3B",
                          fontSize: "20px",
                          cursor: "pointer",
                          ml: 1,
                          mt: 1,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "16px",
                          textAlign: "left",
                          color: "#ffffff",
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        300
                        <span style={{ color: "#71FF33", fontSize: "10px" }}>
                          Connected
                        </span>
                      </Typography>
                      <DialerSipIcon
                        sx={{
                          color: "#AF3F3B",
                          fontSize: "20px",
                          cursor: "pointer",
                          ml: 1,
                          mt: 1,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontSize: "16px",
                          textAlign: "left",
                          color: "#ffffff",
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        400
                        <span style={{ color: "#13CAD6", fontSize: "10px" }}>
                          Monitor
                        </span>
                      </Typography>
                      <Visibility
                        sx={{
                          color: "#13CAD6",
                          fontSize: "20px",
                          ml: 1,
                          mt: 1,
                        }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                    onClick={() => addToBridgeBtn(bridge.id)}
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
                      <DialerSipIcon
                        sx={{ color: "#ffffff", fontSize: "22px" }}
                      />
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          }
        })}
      </Box>
    );

    return content;
  }
};
