import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import QueueManager from "../../components/queue/QueueManager";

const Diagram = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Queues Center" subtitle="Alpha Version" />
      <Box>
        <Box display="flex">
          <Box>
            <Typography variant="h3" color={colors.grey[200]}>
              Queues
            </Typography>
          </Box>
        </Box>
        <QueueManager />
      </Box>
    </Box>
  );
};

export default Diagram;
