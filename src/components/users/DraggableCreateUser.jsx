// https://mui.com/material-ui/react-dialog/
// https://stackoverflow.com/questions/55553033/how-to-handle-speed-dial-actions-using-material-ui
import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { StepperCreateUser } from "./StepperCreateUser";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

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

const actions = [{ icon: <PersonAddAlt1Icon />, name: "Add User" }];

export const DraggableCreateUser = () => {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFullScreen(false);
  };

  const handleFullScreen = () => {
    setFullScreen(true);
  };

  const handleMinimizeScreen = () => {
    setFullScreen(false);
  };

  return (
    <div>
      <Box
        sx={{
          height: 0,
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <SpeedDial
          FabProps={{
            style: { backgroundColor: colors.button[100], color: "white" },
          }}
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: "absolute",
            bottom: 100,
            right: 50,
          }}
          icon={<SpeedDialIcon openIcon={<ArrowUpwardIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              FabProps={{
                style: {
                  backgroundColor: colors.button[100],
                  color: "white",
                },
              }}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClickOpen}
            />
          ))}
        </SpeedDial>
      </Box>

      <Dialog
        PaperProps={{
          sx: {
            borderRadius: "10px",
          },
          className: "box-shadow"
        }}
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            cursor: "move",
            backgroundColor: colors.dialogCard[100],
            textAlign: "left",
            fontWeight: "bold",
          }}
          id="draggable-dialog-title"
        >
          <div>
            <div class="badge-close" onClick={handleClose}></div>
            <div class="badge-minimize" onClick={handleMinimizeScreen}></div>
            <div class="badge-maximize" onClick={handleFullScreen}></div>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.dialogCard[100],
          }}
        >
          <DialogContentText>
            <StepperCreateUser />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
