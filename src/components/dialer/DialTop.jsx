import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Tooltip, IconButton } from "@mui/material";
import { useSelector } from 'react-redux';
import OffCanvasDialer from "./OffCanvasDialer";
import { useDispatch } from "react-redux";
import { openOffCanvas } from "../../features/dialer/offCanvasDialPadSlice";
import PhoneIcon from '@mui/icons-material/Phone';
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { selectCurrentId } from "../../features/auth/authSlice";
import { registeredStatus, inCallStatus } from "../../features/dialer/dialerSlice";
import DialerPad from "../../scenes/global/DialerPad";
import { useLocalStorage } from "../../shared";

const DialTop = ({colors}) => {
  const dispatch = useDispatch()
  // const user_id = useSelector(selectCurrentId);
  const [user, setUser] = useLocalStorage("user", null);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(user?.user?.id);

  const inCallStatusSelector = useSelector(inCallStatus)

  const useStyles = makeStyles((theme) => ({
    snippet: {
      width: "6cm",
      height: "2cm",
      borderRadius: "10%",
      // backgroundColor: colors.primary[400],
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    counter: {
      marginTop: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "-4px",
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    button: {
      backgroundColor: colors.button[100],
      width: "80px",
      height: "30px",
      margin: theme.spacing(0, 1),
      borderRadius: "5px",
      textAlign: "center",
      lineHeight: "30px",
    },

    blinkButton: {
      width: "10px",
      height: "10px",
      marginTop: "10px",
      backgroundColor:  inCallStatusSelector['payload']['dialer']['valueInCallStatus'] == true ? colors.icons[100] : '',
      margin: theme.spacing(0, 1),
      borderRadius: "50%",
      animation: "$blink 1s infinite",
    },

    "@keyframes blink": {
      "50%": {
        opacity: 0,
      },
    },
  }));

  const time = useSelector((state) => state.time.time);

  const openOffRtc = () => {
    dispatch(openOffCanvas(true))
  }

  return (
    <Grid container spacing={2}>

      <Grid item xs={4} md={3}>
        <div className="flex justify-center items-center mb-8">
        <Tooltip title="Alerts" className="my-tooltip card-shadow-2" sx={{ ml: 1, backgroundColor: colors.grey[80]}}>
          <IconButton onClick={openOffRtc}>
            <PhoneIcon sx={{ color: colors.icons[100] }}/>
          </IconButton>
        </Tooltip>

        {/** 
        <Tooltip title="Open Dialer" className="my-tooltip card-shadow-2">
          <PhoneIcon onClick={openOffRtc} fontSize="large" sx={{ cursor: 'pointer', color: colors.icons[100], mt: '2px', borderRadius: '30px', padding: '3px'}}/>
        </Tooltip>
        */}

        </div>
      </Grid>

      <Grid item xs={4} md={3} sx={{ color: colors.grey[200] }}>
      Ext: {users['user']["extension"]}
        {/*{time}*/}
      </Grid>

      <Grid item xs={4} md={3}>
        <div className={`dialerpad-blinkButton w-2.5 h-2.5 mt-2.5 bg-[${ inCallStatusSelector['payload']['dialer']['valueInCallStatus'] == true ? "#00ca4e" : '' }] m-0.25 rounded-full`}></div>
      </Grid>
      {/* <OffCanvasDialer colors={colors} /> */}
      <DialerPad colors={colors}/>
    </Grid>
  );
};

export default DialTop;
