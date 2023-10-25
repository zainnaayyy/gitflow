import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import CallsItemsDialogTable from "./CallsItemsDialogTable";

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

export const CallsItemsDialog = ({ itemId }) => {
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
        <VisibilityIcon sx={{ cursor: "pointer", color: colors.icons[400] }} onClick={setOpen} />
      </Box>
      <Dialog
        PaperProps={{
          sx: {
            borderRadius: "10px",
          },
          className: "box-shadow"
        }}
        fullWidth
        maxWidth='md'
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
            <Typography variant="h5">User Details - { itemId }</Typography>
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
          <Grid container spacing={3} >
          <Grid item xs={12}>
            <Typography variant="h5">
             
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CallsItemsDialogTable itemId={itemId}/>
          </Grid>
          {/* Add more columns for other user information */}
        </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};