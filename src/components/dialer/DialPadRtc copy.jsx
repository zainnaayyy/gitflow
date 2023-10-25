import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { selectCurrentId } from "../../features/auth/authSlice";

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import {
  Call,
  CallEnd,
  Backspace,
  VolumeMute,
  VolumeOff,
  Login,
  Logout,
  DialerSip,
  PhoneForwarded,
  Padding,
  Close,
  Description
} from "@mui/icons-material";
import moment from "moment";
import { closeOffCanvas } from "../../features/dialer/offCanvasDialPadSlice";
import {
  registeredStatus,
  inCallStatus,
  OpenScriptToogleOffCanvas,
} from "../../features/dialer/dialerSlice";
import { callStartedTime } from "../../features/dialer/timeSlice";
import { useChannelActivityDisableMutation } from "../../features/stasis/StasisActivity";

const DialPadRtc = ({colors}) => {
  const user_id = useSelector(selectCurrentId);
  const { data: user, isLoading, isSuccess } = useGetUserQuery(user_id);

  const [extension, setExtension] = useState(`${user["user"]["extension"]}`);
  const [servidor, setServidor] = useState("asterisk.iqbot.live");
  const [contrasena, setContrasena] = useState("Password123");
  const [puerto, setPuerto] = useState("8089");

  const [coolPhone, setCoolPhone] = useState();
  const [registered, setRegistered] = useState(false);
  const [Session, setSession] = useState("");
  const [error, setError] = useState("");

  //in call options
  const [isMute, setIsMute] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [number, setNumber] = useState(1000);
  const [nombre, setNombre] = useState("");
  const [transfer, setTransfer] = useState(200);

  const JsSIP = require("jssip");
  const dispatch = useDispatch();
  const currentDate = moment();
  const serializableDate = moment(currentDate).valueOf();

  const inCallStatusSelector = useSelector((state) => state.dialer)
  console.log('inCallStatusSelector===', inCallStatusSelector)

  const [ channelActivity ] = useChannelActivityDisableMutation()

  useEffect(() => {
    dispatch(inCallStatus(inCall));
  }, [dispatch, setInCall, inCall]);

  useEffect(() => {
    dispatch(registeredStatus(registered));
    dispatch(callStartedTime(serializableDate));
  }, [dispatch, registered, serializableDate]);

  const login = () => {
    try {
      // console.log("server " + servidor + " port " + puerto);
      let domain = servidor;
      let port = puerto;
      let socket = new JsSIP.WebSocketInterface(
        "wss://" + domain + ":" + port + "/ws"
      );

      var configuration = {
        sockets: [socket],
        uri: "sip:" + extension + "@" + domain,
        password: contrasena,
        display_name: extension,
      };

      var ua = new JsSIP.UA(configuration);

      ua.start();
      setCoolPhone(ua);
      

      ua.on("connected", function (e) {
        // console.log("ua.on: connected");
      });

      ua.on("disconnected", function (e) {
        // console.log("disconnected ");
        setError("disconnected");
      });

      ua.on("registered", function (e) {
        // console.log("registered");
        setRegistered(true);
        // setShowPhone(true);
        // setShowLogin(false);
      });

      ua.on("unregistered", function (e) {
        setError("unregistered ");
        setRegistered(false);

        // If the Asterisk is not connected, then the status of the channel on server must be disabled

        channelActivity('300')
        console.log('AQUQQUUQUQUQUIQUQIUQIUQIUIQUIQUQIU')

      });

      ua.on("registrationFailed", function (e) {
        setError(
          error +
            "\n" +
            "Registering on SIP server failed with error: " +
            e.cause
        );
      });

      //incoming call
      var remoteAudio = new window.Audio();
      remoteAudio.autoplay = true;

      ua.on("newRTCSession", function (data) {
        // console.log("newRTCSession", ua.on);
        var session = data.session;
        console.log(
          "session.remote_identity._display_name",
          session.remote_identity._display_name
        );
        console.log("session:", session);
        setNombre(session.remote_identity._display_name);

        if (session.direction === "incoming") {
          // handleIncomingCall(session);
          setSession(session);

          session.on("connecting", function () {
            // console.log("connecting");
          });

          session.on("sending", function () {
            // console.log("sending");
          });

          session.on("progress", function () {
            // console.log("progress");
          });

          session.on("accepted", function () {
            // console.log("the call has been answered");
          });

          session.on("confirmed", function () {
            // console.log("this handler will be called for incoming calls too");
            var localStream = session.connection.getLocalStreams()[0];
            var dtmfSender = session.connection.createDTMFSender(
              localStream.getAudioTracks()[0]
            );
            session.sendDTMF = function (tone) {
              dtmfSender.insertDTMF(tone);
            };
          });

          session.on("ended", function () {
            // console.log("ended");
            // handleEndCall();
          });

          session.on("failed", function (e) {
            console.log(
              "call failed with cause: " + (e ? e.cause : "no cause"),
              e
            );
            // setOpenDialogRinging(false);
          });

          session.on("peerconnection", function (data) {
            // console.log("event peerconnection");
            data.peerconnection.addEventListener("addstream", function (e) {
              remoteAudio.srcObject = e.stream;
            });
          });
        }
      });
    } catch (e) {
      console.log(e);
      console.error(e);
    }
  };

  const handleCall = () => {
    try {
      const _eventHandlers = {
        progress: function (e) {
          console.log("call is in progress:", e);
          // setOpenDialogCalling(true);
        },
        failed: function (e) {
          console.log(
            "call failed with cause: " + (e ? e.cause : "no cause"),
            e
          );
          // setOpenDialogCalling(false);
        },
        ended: function (e) {
          console.log(
            "call ended with cause: " + (e ? e.cause : "no cause"),
            e
          );
          // CREATE ALERT TO WARNING ABOUT MATRIX OFF
          // handleEndCall();
        },
        requestFailed: function (e) {
          console.log(
            "call request Failed with cause: " + (e ? e.cause : "no cause"),
            e
          );
        },
        accepted: function (e) {
          console.log("call accepted", e);
        },
        confirmed: function (e) {
          console.log("call confirmed", e);
        },
      };

      var _callOptions = {
        eventHandlers: _eventHandlers,
        mediaConstraints: { audio: true, video: false },
      };

      const audio = new window.Audio();
      let ua = coolPhone;

      let target = "sip:" + number + "@" + servidor;

      let session = ua.call(target, _callOptions);
      setSession(session);


      {/*
        Make the verification to identify if the channel is active in Stasis
        The function is asyncronous and i need to await the result to compare the string 'connected'
      */}

      if (session.connection) {


        if (typeof session.connection.ontrack !== 'undefined') {
          session.connection.addEventListener("track", async (e) => {
            if (e.track.kind === "audio") {
              audio.srcObject = e.streams[0];
              audio.play();
      
              setSession(session);
              setNombre(number);
      
              await new Promise((resolve) => {
                setTimeout(() => {
                  if (e.target.connectionState === "connected") {
                    setInCall(true);
                  }
      
                  resolve();
                }, 100); // Adjust the delay time as needed
              });
            }
          });
        } else if (typeof session.connection.onaddstream !== 'undefined') {
          session.connection.onaddstream = async (e) => {
            if (e.stream.getAudioTracks().length > 0) {
              audio.srcObject = e.stream;
              audio.play();
      
              setSession(session);
              setNombre(number);
      
              await new Promise((resolve) => {
                setTimeout(() => {
                  if (e.target.connectionState === "connected") {
                    setInCall(true);
                  }
      
                  resolve();
                }, 100); // Adjust the delay time as needed
              });
            }
          };
        }
        

        session.on("addstream", function (e) {
          // set remote audio stream (to listen to remote audio)
          // remoteAudio is <audio> element on page
          const remoteAudio = audio;
          remoteAudio.src = window.URL.createObjectURL(e.stream);
          remoteAudio.play();
        });
        session.connection.addEventListener("peerconnection", (e) => {
          audio.srcObject = e.stream;
          audio.play();
        });
      } else {
        console.log("Connection is null");
      }
    } catch (e) {
      console.error(e);
    }
  };


  const HandleLogOut = () => {
    try {
      let _ua = coolPhone;

      _ua.stop();

      _ua.on("disconnected", function (e) {
        // setShowPhone(false);
        // setShowLogin(true);
        setInCall(false);
        console.log("disconnected bob", e);
      });

      _ua.on("unregistered", function (e) {
        // setShowPhone(false);
        // setShowLogin(true);
        console.log("unregistered bob");
      });

      _ua.on("registrationFailed", function (e) {
        // setShowPhone(false);
        // setShowLogin(true);
        console.log("registrationFailed bob", e);
      });

      _ua.on("registrationExpiring", function (e) {
        // setShowPhone(false);
        // setShowLogin(true);
        console.log("registrationExpiring bob", e);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNumber = (digitado) => {
    let numero = number;
    numero += digitado;
    setNumber(numero);
  };

  const handleEraseLastInput = () => {
    let numero = number.substring(0, number.length - 1);
    setNumber(numero);
  };

  const handleEraseInput = () => {
    setNumber("");
  };

  const handleClose = () => {
    dispatch(closeOffCanvas());
  };

  const toogleScript = () => {
    dispatch(OpenScriptToogleOffCanvas(true))
  }




  return (
    <div>
      <div>
        <div className="badge-close-dialpad" onClick={handleClose}></div>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ mb: 2 }}>
          {!registered && (
            <Button
              sx={{
                backgroundColor: colors.greenAccent[500],
                fontSize: "12px",
                color: "#ffffff",
              }}
              className="shadow"
              onClick={login}
            >
              Login
            </Button>
          )}

          {registered && !inCall && (
            <Button
              sx={{
                backgroundColor: colors.profile[100],
                fontSize: "12px",

                color: "#ffffff",
                marginLeft: "2px",
              }}
              className="shadow"
              onClick={handleCall}
            >
              Connect to Matrix
            </Button>
          )}

          {registered && inCall && (
            <Box display='flex'>
              <Box>Online</Box>
              <Box
                className="blinkRound"
                sx={{ backgroundColor: colors.icons[100], ml: 2, mt: 1 }}
              ></Box>
              <Box sx={{ ml: 2, cursor: 'pointer'}}>
                <Description fontSize="large" onClick={toogleScript}/>
              </Box>
            </Box>
          )}
        </Box>

        <OutlinedInput
          size="small"
          style={{ width: 210, height: 40, fontSize: 16 }}
          id="outlined-adornment-weight"
          onChange={(e) => setNumber(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Backspace onClick={() => handleEraseLastInput()}></Backspace>
            </InputAdornment>
          }
          value={number}
        />

        <Grid>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mt: 2,
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("1")}
          >
            <span>{"1"}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mt: 2,
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("2")}
          >
            <span>{"2"}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mt: 2,
              mb: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("3")}
          >
            <span>{"3"}</span>
          </Button>
        </Grid>

        <Grid>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("4")}
          >
            <span>{"4"}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("5")}
          >
            <span>{"5"}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("6")}
          >
            <span>{"6"}</span>
          </Button>
        </Grid>

        <Grid>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("7")}
          >
            <span>{"7"}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("8")}
          >
            <span>{"8"}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleAddNumber("9")}
          >
            <span>{"9"}</span>
          </Button>
        </Grid>

        <Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              mr: 1,
            }}
            onClick={() => handleEraseLastInput()}
          >
            <span>{"E"}</span>
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
              mr: 1,
            }}
            onClick={() => handleAddNumber("0")}
          >
            <span>{"0"}</span>
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mb: 1,
            }}
            onClick={() => handleEraseInput("0")}
          >
            <span>{"C"}</span>
          </Button>
        </Grid>

        <Grid>
          <Button
            sx={{
              backgroundColor: colors.redAccent[500],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mt: 1,
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => HandleLogOut()}
            disabled={!registered}
          >
            <Close>{}</Close>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.profile[100],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mt: 1,
              mb: 1,
              mr: 1,
            }}
            type="submit"
            variant="contained"
          >
            <span>{}</span>
          </Button>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[500],
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              mt: 1,
              mb: 1,
            }}
            type="submit"
            variant="contained"
            onClick={() => handleCall()}
            disabled={!registered || inCall}
          >
            <Call>{}</Call>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DialPadRtc;
