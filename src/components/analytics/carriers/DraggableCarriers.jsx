import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

import { Ambetter } from "../../../scenes/analytics/carriers/ambetter";
import { BCBS } from "../../../scenes/analytics/carriers/bcbs";
import { Caresource } from "../../../scenes/analytics/carriers/caresource";
import { UnitedHealthcare } from "../../../scenes/analytics/carriers/unitedhealthcare";

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

export const DraggableCarriers = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

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
      <Button
        sx={{ backgroundColor: colors.profile[100], color: "#ffffff", fontSize: "14px", marginTop: "14px" }}
        className="stl-btn-send"
        variant="contained"
        onClick={handleClickOpen}
      >
        Details
      </Button>
      <Dialog
        PaperProps={{
          sx: {
            borderRadius: "10px",
          },
          className: "box-shadow"
        }}
        fullWidth
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{
            cursor: "move",
            backgroundColor: colors.primary[400],
          }}
        >
          <Box>
            <Box className="badge-close" onClick={handleClose}></Box>
            <Box
              className="badge-minimize"
              onClick={handleMinimizeScreen}
            ></Box>
            <Box className="badge-maximize" onClick={handleFullScreen}></Box>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <DialogContentText>
            {props.carrier === "Ambetter" && (
              <Ambetter carrier="Ambetter" active_users={props.active_users} />
            )}
            {props.carrier === "BCBS" && (
              <BCBS carrier="BCBS" active_users={props.active_users} />
            )}
            {props.carrier === "UnitedHealthcare" && (
              <UnitedHealthcare
                carrier="UnitedHealthcare"
                active_users={props.active_users}
              />
            )}
            {props.carrier === "Caresource" && (
              <Caresource
                carrier="Caresource"
                active_users={props.active_users}
              />
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
