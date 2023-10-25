import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/system";
import { useSelector } from "react-redux";

const OffCanvasScript = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const toggleState = useSelector((state) => state.dialer);

  const useStyles = makeStyles({
    widgetContainer: {
      position: "absolute",
      top: 120,
      bottom: 0,
      left: -553,
      width: "560px",
      height: "660px",
      backgroundColor: colors.primary[450],
      overflow: "hidden",
      transition: "transform 0.5s ease-out",
      // transform: "translateX(100%)",
      borderRadius: "10px",
      boxShadow: `0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075)`,
    },
    title: {
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      fontSize: "24px",
      color: colors.contentSideBar[100],
    },
    content: {
      paddingLeft: "30px",
      paddingRight: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      fontSize: "24px",
      color: colors.contentSideBar[100],
    },
    button: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px",
      backgroundColor: "#ccc",
      borderRadius: "5px",
      cursor: "pointer",
    },
  });

  const [showWidget, setShowWidget] = useState(false);

  const toggleWidget = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div>
      <div
        className="offCanvasScript-widgetContainer"
        style={{
          transform: showWidget ? "translateX(97%)" : "translateX(0%)",
        }}
      >
        <div className="offCanvasScript-title">
          <h3> ACA Script </h3>
        </div>
        <div className="offCanvasScript-content">
          <p>I will test this window to see if there id a problem. I will test this window to see if there id a problem. I will test this window to see if there id a problem. I will test this window to see if there id a problem. I will test this window to see if there id a problem. </p>
        </div>
      </div>
      {/* DEACTIVATED TO HIDE UGLY BUTTON
      <button className="offCanvasScript-button" onClick={toggleWidget}>
        Open Script
      </button>
      */}
    </div>
  );
};

export default OffCanvasScript;
