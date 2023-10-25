import {isMobile} from 'react-device-detect';
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { tokens } from '../../theme';

import { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import BottomMenu from "./BottomMenu";
import DialerPad from './DialerPad';



const MenuBase = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [themex, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themex}>
        <CssBaseline /> {/* Reset the default Mui CSS configuration */}
        <div className="app">
          { !isMobile ? (
            <Sidebar isSidebar={isSidebar} />
          ):(
            <BottomMenu />
          )
          }
          {/*<BottomMenu />*/}
          <main className="content ">
            <TopBar setIsSidebar={setIsSidebar} />
            <Outlet />
          </main>
          {/*<DialerPad colors={colors} />*/}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MenuBase;
