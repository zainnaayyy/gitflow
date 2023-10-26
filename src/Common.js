// TEST A WAY TO MAKE AVAILABLE TO ALL PROJECT, REDUCING THE QUANTITY OF CODE PER FILE
import React from "react";
import { useTheme } from "@mui/material";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";

const Common = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return <div>common</div>;
  // we are having a comment while working on feature one
  // Feature two for gabriel and talha
};

export default Common;

//zaintask: Talha, modified this line.