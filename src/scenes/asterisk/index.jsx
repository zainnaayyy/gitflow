import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DialPadRtc from "../../components/dialer/DialPadRtc";

const TestRtc = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Test WebRTC" subtitle="Beta Version" />
      <Box>
        <Box display="flex">
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Typography variant="h3" color={colors.grey[200]}>
              RTC Testing Call
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4}}>

          <DialPadRtc />
        </Box>
      </Box>
    </Box>
  );
};

export default TestRtc;
