// https://mui.com/material-ui/react-dialog/
// https://stackoverflow.com/questions/55553033/how-to-handle-speed-dial-actions-using-material-ui
import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

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

export const UserDetailsDialog = ({ userId }) => {
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
            <Typography variant="h5">User Details - { userId }</Typography>
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
          <Grid item xs={12} sm={4}>
            <Typography>Name:</Typography>
            <Typography>User</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography >Email:</Typography>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>Address:</Typography>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>Phone Number:</Typography>
            <Typography>Phone Number</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>Social Security:</Typography>
            <Typography>Social</Typography>
          </Grid>
          {/* Add more columns for other user information */}
        </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
