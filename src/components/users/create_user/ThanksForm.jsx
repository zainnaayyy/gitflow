import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
const ThanksForm = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="thanks-container">
      <CheckCircleIcon
        sx={{
          mt: 4,
          fontSize: "68px",
          color: colors.greenAccent[400],
        }}
      />
      <h2>Sucsses!</h2>
      <span>Action performed successfully.</span>
    </div>
  );
};

export default ThanksForm;
