import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import DialPadRtc from "./DialPadRtc";
import { useSelector } from "react-redux";
import { useGetChannelsActivityQuery } from "../../features/stasis/StasisActivity";

const OffCanvasDialer = ({colors}) => {
  const offCanvasState = useSelector((state) => state.offCanvasDial['value']);

  const useStyles = makeStyles({
    widgetContainer: {
      position: "absolute",
      backdropFilter: "blur(20px)",
      top: 200,
      bottom: 0,
      right: 260,
      width: "300px",
      height: "440px",
      backgroundColor: colors.primary[1100],
      border: `3px solid ${colors.primary[450]}`,
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

  useEffect(() => {
    setShowWidget(offCanvasState)
  }, [offCanvasState])


  const toggleWidget = () => {
    setShowWidget(!showWidget);
  };


  return (
    <div>

      <div
        className="offCanvasDialer-widgetContainer"
        style={{
          transform: showWidget ? "translateX(0%)" : "translateX(94%)",
        }}
      >
        <div className="offCanvasDialer-content">
          <DialPadRtc colors={colors}/>
        </div>
      </div>
      {/*       
      <button className="offCanvasDialer-content" onClick={toggleWidget}>
        Toggle Widget
      </button>
      */}
    </div>
  );
};

export default OffCanvasDialer;
