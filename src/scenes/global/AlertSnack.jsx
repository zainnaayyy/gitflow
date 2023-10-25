import React, { useState } from "react";
import { Slide, Snackbar, useTheme, SnackbarContent } from "@mui/material";
import { tokens } from "../../theme";
import { fontWeight } from "@mui/system";

export const AlertSnack = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const changeSnack = () => {
    setOpen(true);
  };

  return (
    <div>
      <Snackbar
        sx={{ mt: 10 }}
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        TransitionComponent={Slide}
        TransitionProps={{
          direction: "right",
          timeout: { enter: 1000, exit: 1000 },
        }}
        message="This is an alert!"
      >
        <SnackbarContent
          style={{
            backgroundColor: colors.icons[300],
						color: "#FFFFFF",
						fontSize: '16px'
          }}
          message={<span id="client-snackbar">Hello World</span>}
        />
      </Snackbar>

      <button onClick={changeSnack}> ROOOODAAA </button>
    </div>
  );
};
