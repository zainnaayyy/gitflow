import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import DialerSipIcon from "@mui/icons-material/DialerSip";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { selectCurrentId } from "../../features/auth/authSlice";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
const JsSIP = require("jssip");

const DialTop = () => {
  const user_id = useSelector(selectCurrentId);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(user_id);

  const [coolPhone, setCoolPhone] = useState();

  const login = () => {
    try {
      const server = "asterisk.iqbot.live";
      const port_wss = "8089";
      const password = "Password123";
      const extension = `${users["user"]["extension"]}`;

      console.log("server " + server + " port " + port_wss);
      let domain = server;
      let port = port_wss;
      let socket = new JsSIP.WebSocketInterface(
        "wss://" + domain + ":" + port + "/ws"
      );

      var configuration = {
        sockets: [socket],
        uri: "sip:" + extension + "@" + domain,
        password: password,
        display_name: extension,
      };

      var ua = new JsSIP.UA(configuration);
      ua.start();
      setCoolPhone(ua);

      ua.on("connected", function (e) {
        console.log("connected");
      });

      ua.on("disconnected", function (e) {
        console.log("disconnected");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const callMatrix = () => {
    // Register callbacks to desired call events
    var eventHandlers = {
      progress: function (e) {
        console.log("call is in progress");
      },
      failed: function (e) {
        console.log("call failed with cause: " + e.data.cause);
      },
      ended: function (e) {
        console.log("call ended with cause: " + e.data.cause);
      },
      confirmed: function (e) {
        console.log("call confirmed");
      },
    };

    var options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: false },
    };

    try {
      const vai_porra = coolPhone.call("1000", options);
      console.log("Call the Matrix button pressed");
      console.log("vai_porra:", vai_porra);
    } catch (e) {
      console.log("error:", e);
    }
  };

  const dropMatrix = () => {
    coolPhone.stop();
  };

  let content;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (isLoading) {
    content = <Box> Loading...</Box>;
  } else if (isSuccess)
    content = (
      <Box
        sx={{
          width: "100%",
          background: colors.grey[1000],
          borderRadius: "4px",
          padding: "0px 4px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#ffffff",
            textAlign: "left",
            ml: 1,
            marginTop: "2px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Extension: {users["user"]["extension"]}
          <Box>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#ffffff",
                marginLeft: "38px",
              }}
            >
              00:00
            </span>
          </Box>
          <DialerSipIcon
            sx={{
              color: "#AF3F3B",
              fontSize: "16px",
              float: "right",
              mr: 1,
            }}
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onClick={login}
            size="small"
            sx={{
              backgroundColor: "#0e8e5f",
              width: "80%",
              height: "22px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
            }}
            className="btn-connect"
          >
            <span sx={{ color: "#ffffff", fontSize: "22px" }}>Server</span>
          </Button>
          <Button
            onClick={callMatrix}
            size="small"
            sx={{
              backgroundColor: "#0e8e5f",
              width: "80%",
              height: "22px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              ml: 1,
            }}
            className="btn-connect"
          >
            <span sx={{ color: "#ffffff", fontSize: "22px" }}>Matrix</span>
          </Button>
        </Box>
      </Box>
    );
  return content;
};

export default DialTop;
