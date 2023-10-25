// https://mui.com/material-ui/react-dialog/
// https://stackoverflow.com/questions/55553033/how-to-handle-speed-dial-actions-using-material-ui
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

import EditIcon from "@mui/icons-material/Edit";

import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

import TicketUpdateForm from "./TicketUpdateForm";

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

export const TicketUpdateDialog = ({ ticketId }) => {
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
    <Box>
      <Box
        sx={{
          height: 0,
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <EditIcon sx={{ cursor: "pointer", color: colors.icons[200] }} onClick={setOpen} />
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
            textAlign: "right",
            fontWeight: "bold",
          }}
          id="draggable-dialog-title"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Ticket Update</Typography>
            <Typography variant="h6">
              {" "}
              <div className="badge-maximize" onClick={handleFullScreen}></div>
              <div className="badge-minimize" onClick={handleMinimizeScreen}></div>
              <div className="badge-close" onClick={handleClose}></div>
            </Typography>
            
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: colors.dialogCard[100],
          }}
        >
          <DialogContentText>
            <TicketUpdateForm ticketId={ticketId} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
