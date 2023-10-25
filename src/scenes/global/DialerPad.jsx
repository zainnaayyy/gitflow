import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import DialPadRtc from "../../components/dialer/DialPadRtc";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useLocalStorage } from "../../shared";

const DialerPad = ({ colors }) => {
  // Check if is logged to hide Sidebar
  // const user_id = useSelector(selectCurrentId);
  const [user_id, setUser] = useLocalStorage("user", null);
  const { data: profile, isLoading, isSuccess } = useGetUserQuery(user_id?.user?.id);

  const offCanvasState = useSelector((state) => state.offCanvasDial["value"]);

  const useStyles = makeStyles({
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

  // const classes = "";
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    if (offCanvasState) {
      setShowWidget(true);
    } else {
      setShowWidget(false);
    }
  }, [offCanvasState]);

	let content;

  if(isLoading){
		content = <h1>'Loading'</h1>
	} else if(isSuccess) {
		content = (
			<div>
      <div
        className="dialerpad-widgetContainer absolute backdrop-blur-[20px] top-[200px] right-[260px] w-[300px] h-[440px] bg-[#1b1d21] z-10"
        style={{
          backdropFilter: "blur(40px)",
          backgroundColor: 'rgb(0 0 0 / 70%)',
          transform: showWidget ? "translateX(0%)" : "translateX(94%)",
          visibility: showWidget ? "visible" : "hidden",
        }}
      >
        <div className="px-[30px] flex justify-center items-start text-2xl text-gray-600">
          <DialPadRtc colors={colors} />
        </div>
      </div>
      {/*             
      <button className="fixed bottom-5 right-5 p-2.5 bg-gray-300 rounded-md cursor-pointer" >
        Toggle Widget
      </button>
      */}
    </div>

		)
	}
	return content;
};

export default DialerPad;
