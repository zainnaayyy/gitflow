import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme, Box, Button, Grid } from "@mui/material";
import { tokens } from "../../theme";
import OffCanvas from "./OffCanvas";
import { useSelector } from 'react-redux';

const DialTop = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      backgroundColor: colors.icons[100],
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

  const classes = "";

  const time = useSelector((state) => state.time.time);

  const RunOffCanvas = () => {
    <OffCanvas />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={3}>
        <div className={classes.buttons}>
          <Button onClick={RunOffCanvas} variant="contained" className={classes.button}>
            Button
          </Button>
        </div>
      </Grid>
      <Grid item xs={4} md={1}>
        {time}
      </Grid>
      <Grid item xs={4} md={3}>
        <div className={classes.buttons}>
          <div className={classes.blinkButton}></div>
        </div>
      </Grid>

    </Grid>
  );
};

export default DialTop;
