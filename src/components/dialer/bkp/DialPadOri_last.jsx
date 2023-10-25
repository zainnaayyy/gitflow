// Original Dialer Code
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Collapse,
  TextField,
  InputAdornment,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Typography
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
} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { selectCurrentId } from "../../features/auth/authSlice";

import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

import ringer from "../../telephone-ring-04.mp3";
import { callStatus, callInsert } from "../../features/dialer/dialerSlice";
import { actualTime, callDurationTime } from "../../features/dialer/timeSlice";

const JsSIP = require("jssip");
//JsSIP.debug.disable('JsSIP:*');

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function DialPadOri() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const user_id = useSelector(selectCurrentId);

  const { data: users, isLoading, isSuccess } = useGetUserQuery(user_id);

  //login
  const [extension, setExtension] = useState(`${users["user"]["extension"]}`);
  const [servidor, setServidor] = useState("asterisk.iqbot.live");
  const [contrasena, setContrasena] = useState("Password123");
  const [puerto, setPuerto] = useState("8089");

  const [coolPhone, setCoolPhone] = useState();
  const [laSesion, setLaSesion] = useState("");
  const [error, setError] = useState("");

  //in call options
  const [isMute, setIsMute] = useState(false);
  const [inCall, setinCall] = useState(false);
  const [number, setNumber] = useState(1000);
  const [nombre, setNombre] = useState("");
  const [transfer, setTransfer] = useState(200);

  //dialogs and panels
  const [showLogin, setShowLogin] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [openDialogCall, setOpenDialogCall] = useState(false);
  const [openDialogRinging, setOpenDialogRinging] = useState(false);
  const [openDialogCalling, setOpenDialogCalling] = useState(false);

  //notes
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  //in call time
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  //audio
  const [ringingAudio, setRingingAudio] = useState(new Audio(ringer));
  ringingAudio.loop = true;

  const dispatch = useDispatch();

  // get the current time in milliseconds
  const currentTime = Date.now();

  // dispatch the setTime action with the current time
  dispatch(callDurationTime(currentTime));

  // Button Control Title
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const callOptions = {
    mediaConstraints: {
      audio: true, // only audio calls
      video: false,
    },
    /*
    pcConfig: {
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302'] },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ]
    }
    */
  };

  useEffect(() => {
    let interval = null;
    if (inCall) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        if (seconds === 59) {
          setMinutes((minutes) => minutes + 1);
          setSeconds(0);
        }
        if (minutes === 59) {
          setHours((hours) => hours + 1);
          setMinutes(0);
        }
      }, 1000);
    } else if (!inCall) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [inCall, minutes, seconds]);

  // CONTINUE TESTS TO PUT THE CALL STATUS IN STORE

  useEffect(() => {
    dispatch(callInsert(error));
    dispatch(callInsert(laSesion));
    dispatch(callInsert(coolPhone));
  }, [error, setError, laSesion, setLaSesion, coolPhone, setCoolPhone]);

  const login = () => {
    try {
      console.log("server " + servidor + " port " + puerto);
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
        console.log("ua.on: connected");
      });

      ua.on("disconnected", function (e) {
        console.log("disconnected ");
        setError("disconnected");
      });

      ua.on("registered", function (e) {
        console.log("registered");
        setShowPhone(true);
        setShowLogin(false);
      });

      ua.on("unregistered", function (e) {
        setError("unregistered ");
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
        var session = data.session;
        setNombre(session.remote_identity._display_name);

        if (session.direction === "incoming") {
          handleIncomingCall(session);
          setLaSesion(session);

          session.on("connecting", function () {
            console.log("connecting");
          });

          session.on("sending", function () {
            console.log("sending");
          });

          session.on("progress", function () {
            console.log("progress");
          });

          session.on("accepted", function () {
            console.log("the call has been answered");
          });

          session.on("confirmed", function () {
            console.log("this handler will be called for incoming calls too");
            var localStream = session.connection.getLocalStreams()[0];
            var dtmfSender = session.connection.createDTMFSender(
              localStream.getAudioTracks()[0]
            );
            session.sendDTMF = function (tone) {
              dtmfSender.insertDTMF(tone);
            };
          });

          session.on("ended", function () {
            console.log("ended");
            handleEndCall();
          });

          session.on("failed", function (e) {
            console.log(
              "call failed with cause: " + (e ? e.cause : "no cause"),
              e
            );
            setOpenDialogRinging(false);
          });

          session.on("peerconnection", function (data) {
            console.log("event peerconnection");
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

  const HandleLogOut = () => {
    try {
      let _ua = coolPhone;

      _ua.stop();

      _ua.on("disconnected", function (e) {
        setShowPhone(false);
        setShowLogin(true);
        console.log("disconnected bob", e);
      });

      _ua.on("unregistered", function (e) {
        setShowPhone(false);
        setShowLogin(true);
        console.log("unregistered bob");
      });

      _ua.on("registrationFailed", function (e) {
        setShowPhone(false);
        setShowLogin(true);
        console.log("registrationFailed bob", e);
      });

      _ua.on("registrationExpiring", function (e) {
        setShowPhone(false);
        setShowLogin(true);
        console.log("registrationExpiring bob", e);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCall = () => {
    try {
      const _eventHandlers = {
        progress: function (e) {
          console.log("call is in progress");
          setOpenDialogCalling(true);
        },
        failed: function (e) {
          console.log(
            "call failed with cause: " + (e ? e.cause : "no cause"),
            e
          );
          setOpenDialogCalling(false);
        },
        ended: function (e) {
          console.log(
            "call ended with cause: " + (e ? e.cause : "no cause"),
            e
          );
          handleEndCall();
        },
        requestFailed: function (e) {
          console.log(
            "call request Failed with cause: " + (e ? e.cause : "no cause"),
            e
          );
        },
        accepted: function (e) {
          console.log("call accepted ");
        },
        confirmed: function (e) {
          console.log("call confirmed");
          setOpenDialogCall(true);
          setOpenDialogCalling(false);
          setinCall(true);
        },
      };

      var _callOptions = {
        eventHandlers: _eventHandlers,
        mediaConstraints: { audio: true, video: false },
        /*
      pcConfig: {
        iceServers: [
          { urls: ['stun:stun.l.google.com:19302'] },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ]
      }
      */
      };

      const audio = new window.Audio();
      let ua = coolPhone;

      let target = "sip:" + number + "@" + servidor;

      let session = ua.call(target, _callOptions);
      setLaSesion(session);

      if (session.connection) {
        session.connection.addEventListener("addstream", (e) => {
          console.log("Add stream");
          audio.srcObject = e.stream;
          audio.play();
          setinCall(true);
          setLaSesion(session);
          setNombre(number);
        });

        session.on("addstream", function (e) {
          console.log("Add stream2");
          // set remote audio stream (to listen to remote audio)
          // remoteAudio is <audio> element on page
          const remoteAudio = audio;
          remoteAudio.src = window.URL.createObjectURL(e.stream);
          remoteAudio.play();
        });
        session.connection.addEventListener("peerconnection", (e) => {
          console.log("Peer connection");
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

  const handleIncomingCall = (session) => {
    setOpenDialogRinging(true);
    ringingAudio.play();
  };

  const handleAnswerCall = () => {
    setinCall(true);
    setOpenDialogCall(true);
    setOpenDialogRinging(false);

    var session = laSesion;
    session.answer(callOptions);

    ringingAudio.pause();
  };

  const handleEndCall = () => {
    setinCall(false);
    let time = hours + ":" + minutes + ":" + seconds;
    setOpenDialogCalling(false);
    setOpenDialogRinging(false);

    var session = laSesion;
    if (session != "") {
      if (!session.isEnded()) {
        session.terminate();
      }
    }

    ringingAudio.pause();
  };

  const handleMuteEvent = () => {
    var session = laSesion;
    if (session.isMuted().audio) {
      session.unmute({ audio: true });
    } else {
      session.mute({ audio: true });
    }

    isMute === true ? setIsMute(false) : setIsMute(true);
  };

  const handleTransferCall = () => {
    //let notas = editorState.getCurrentContent().getPlainText('\u0001')
    console.log("inicia transferencia");

    const _eventHandlers = {
      accepted: function (e) {
        console.log("eventHandler: transfer call accepted");
      },

      failed: function (e) {
        console.log(
          "eventHandler: transfer call failed with cause: " +
            (e ? e.cause : "no cause"),
          e
        );
      },

      ended: function (e) {
        console.log(
          "eventHandler: call ended with cause: " + (e ? e.cause : "no cause"),
          e
        );
      },

      requestFailed: function (e) {
        console.log(
          "eventHandler: transfer call request Failed with cause: " +
            (e ? e.cause : "no cause"),
          e
        );
      },

      requestSucceeded: function (e) {
        console.log("eventHandler: transfer call request Succeeded");
      },

      trying: function (e) {
        console.log("eventHandler: transfer call trying");
      },

      progress: function (e) {
        console.log("transfer call progress");
      },

      confirmed: function (e) {
        console.log("transfer call confirmed");
      },
      addstream: (e) => {
        console.log("transfer call addstream");
      },
    };

    var _callOptions = {
      eventHandlers: _eventHandlers,
      mediaConstraints: { audio: true, video: false },
      /*
    pcConfig: {
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302'] },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ]
    }
    */
    };

    let target = "sip:" + transfer + "@" + servidor;
    let session = laSesion;
    let transferencia = session.refer(target, _callOptions);
    setOpenDialogCall(false);
  };

  const handleSaveNotes = () => {
    let notas = editorState.getCurrentContent().getPlainText("\u0001");
    //console.log(notas)
  };

  const handleCloseDialog = () => {
    setOpenDialogCall(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const handlePreventClose = () => {
    setOpenDialogCall(true);
  };

  const handlePreventCloseRinging = () => {
    setOpenDialogRinging(true);
  };

  const handlePreventCloseCalling = () => {
    setOpenDialogCalling(true);
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

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  const handleClose = () => {
    setOpenDialogCall(false);
    setFullScreen(false);
  };

  const handleFullScreen = () => {
    setFullScreen(true);
  };

  const handleMinimizeScreen = () => {
    setFullScreen(false);
  };

  return (
    <Box
      sx={{ mx: "auto" }} // Was MT-3
      backgroundColor={colors.primary[710]}
      className="card-dash card-shadow card-animation"
      height={350}
      width={"80%"}
    >
      <Box display="flex" flexWrap="wrap"></Box>
      <Collapse
        in={showLogin}
        sx={{ ...(showLogin ? { padding: "30px" } : "") }}
      >
        <Grid container spacing={2} direction="row" marginTop={2}>
          <Grid id="Contacto" item lg={6} md={6} sm={6} xs={6}>
            <InputLabel>{"Extension"}</InputLabel>
          </Grid>
          <Grid id="Contacto" item lg={6} md={6} sm={6} xs={6}>
            <TextField
              variant="outlined"
              size="small"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <InputLabel>{"Password"}</InputLabel>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="*****"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <InputLabel>{"Server"}</InputLabel>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="192.168.0.10"
              value={servidor}
              onChange={(e) => setServidor(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <InputLabel>{"Port"}</InputLabel>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="8089"
              value={puerto}
              onChange={(e) => setPuerto(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <InputLabel>{"Port"}</InputLabel>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Button
              sx={{
                backgroundColor: colors.greenAccent[500],
                fontSize: "16px",
                fontWeight: 600,
                color: "#ffffff",
                mt: 4,
              }}
              type="submit"
              style={{ width: "5%" }}
              variant="contained"
              onClick={() => login()}
            >
              <Login>{}</Login>
            </Button>
          </Grid>
        </Grid>

        <Grid>{"Login Asterisk"}</Grid>
        <Grid>{error}</Grid>
      </Collapse>
      <Collapse
        in={showPhone}
        sx={{ ...(showPhone ? { padding: "30px" } : "") }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
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
            >
              <Call>{}</Call>
            </Button>
          </Grid>
        </Grid>
      </Collapse>
      <Dialog
        open={openDialogCall}
        onClose={() => handlePreventClose()}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
     
        <DialogTitle
          style={{
            cursor: "move",
            backgroundColor: colors.dialogCard[100],
            textAlign: "right",
            fontWeight: "bold",
          }}
          id="draggable-dialog-title"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Ticket Update</Typography>
            <Typography variant="h6">
              {" "}
              <div className="badge-maximize" onClick={handleFullScreen}></div>
              <div className="badge-minimize" onClick={handleMinimizeScreen}></div>
              <div className="badge-close" onClick={handleClose}></div>
            </Typography>
            
          </Box>
          {inCall === true ? "Ongoing Call" : "Call Ended"}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.dialogCard[100],
          }}>
          <Grid container spacing={0} direction="row">
            <Grid id="Contact" item lg={8} md={6} sm={6} xs={6}>
              {nombre}{" "}
              <label style={{ color: "black" }}>
                <strong>{} </strong>
              </label>
            </Grid>

            <Grid id="ContactoDerecha" item lg={4} md={6} sm={6} xs={6}>
              {hours}:{minutes}:{seconds} &nbsp;
              <Button
                type="submit"
                style={{ backgroundColor: "red", width: "60%" }}
                variant="contained"
                onClick={() => handleEndCall()}
              >
                <CallEnd>{}</CallEnd>
              </Button>
            </Grid>
          </Grid>
          <ColoredLine color="black" />
          <Grid container spacing={0} direction="row">
            <Grid item lg={8} md={6} sm={6} xs={6}>
              <Collapse in={isMute && inCall}>
                <Button
                  type="submit"
                  onClick={() => handleMuteEvent()}
                  title="Audio"
                >
                  <VolumeOff>{}</VolumeOff>
                </Button>
                <Grid>{"Mic"}</Grid>
              </Collapse>

              <Collapse in={!isMute && inCall}>
                <Button
                  type="submit"
                  onClick={() => handleMuteEvent()}
                  title="Mute"
                >
                  <VolumeMute>{}</VolumeMute>
                </Button>
                <Grid>{"Mic"}</Grid>
              </Collapse>

              <Button
                type="submit"
                onClick={() => handleTransferCall()}
                title="Call Transfer"
              >
                <PhoneForwarded>{}</PhoneForwarded>
              </Button>
              <Grid>{"Transfer"}</Grid>
              <TextField
                variant="outlined"
                size="small"
                value={transfer}
                onChange={(e) => setTransfer(e.target.value)}
              />
            </Grid>
          </Grid>
          {/*
          <Grid>
            <strong>{"Notes"} </strong>
            <div
              style={{
                border: "1px solid black",
                minHeight: "6em",
                cursor: "text",
              }}
              onClick={focusEditor}
            >
              <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Add Call Notes"
              />
            </div>
          </Grid>
          */}
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: colors.dialogCard[100],
          }}>
          <Collapse in={!inCall}>
            {/*
            <Button variant="contained" onClick={() => handleSaveNotes()}>
              Save Notes
            </Button>
            &nbsp;&nbsp;
          */}
            <Button
              variant="contained"
              onClick={() => handleCloseDialog()}
              autoFocus
            >
              Exit
            </Button>
          </Collapse>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogRinging}
        onClose={() => handlePreventCloseRinging()}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
        <DialogTitle>{"Incomming Call"}</DialogTitle>
        <DialogContent>
          <Grid>{nombre}</Grid>
          <Grid>{"200"}</Grid>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "green" }}
            onClick={() => handleAnswerCall()}
          >
            <Call>{}</Call>
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => handleEndCall()}
          >
            <CallEnd>{}</CallEnd>
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogCalling}
        onClose={() => handlePreventCloseCalling()}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
        }}
      >
        <DialogTitle>{"Calling"}</DialogTitle>
        <DialogContent>
          <Grid>{number}</Grid>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => handleEndCall()}
          >
            <CallEnd>{}</CallEnd>
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DialPadOri;
