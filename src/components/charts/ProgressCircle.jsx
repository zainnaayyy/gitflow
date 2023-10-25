import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Used in the Dashboard top Cards - CSS Progress Bar
const ProgressCircle = ({ progress = "0.75 ", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[710]} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${colors.contentCard[300]} ${angle}deg 360deg),
                ${colors.contentCard[100]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></Box>
  );
};

export default ProgressCircle;
