import React, { useState } from "react";
import { useAuth } from "../../../shared";
import TopBar from "../../../scenes/global/TopBar";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../../theme";
import { isMobile } from "react-device-detect";
import Sidebar from "../../../scenes/global/Sidebar";
import BottomMenu from "../../../scenes/global/BottomMenu";
import DialerPad from "../../../scenes/global/DialerPad";

function PrivateLayout({ children }) {
  const { user } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [themex, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themex}>
        <CssBaseline />
        <div className="app">
          {!isMobile ? <Sidebar isSidebar={isSidebar} /> : <BottomMenu />}
          <main className="content">
            <TopBar setIsSidebar={setIsSidebar} />
            {children}
          </main>
          {/* <DialerPad colors={colors}/> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PrivateLayout;
