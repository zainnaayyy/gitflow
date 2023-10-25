import React from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import { Navbar } from "../../components";
// import sizeConfigs from "../../configs/sizeConfigs";

function PublicLayout({ user, children }) {
  const [themex, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themex}>
        <CssBaseline />
        <div className="app">
          {/* <Navbar isUser={user} /> */}
          {/* <main style={{marginTop:`calc(15% - ${sizeConfigs.navbar.height})`}}>{children}</main> */}
          <main className="content">{children}</main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PublicLayout;
