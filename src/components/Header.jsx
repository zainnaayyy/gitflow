import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px" mt="100px">
      <Typography
        className="font-vz"
        variant="h2"
        color={colors.grey[200]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.grey[1002]} className="font-vz">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
