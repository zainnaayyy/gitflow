import { useTheme, Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import QueueManager from "../../components/queue/QueueManager";
import CustomerManager from "../../components/queue/CustomerManager";
import AttendantManager from "../../components/queue/AttendantManager";

const Diagram = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const useStyles = makeStyles({
    widgetContainer: {

      width: "100%",
      height: "100%",
      backgroundColor: colors.primary[450],
      overflow: "hidden",
      transition: "transform 0.5s ease-out",
      // transform: "translateX(100%)",
      borderRadius: "10px",
      boxShadow: `0 1px 1px hsl(0deg 0% 0% / 0.075),
      0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075),
      0 8px 8px hsl(0deg 0% 0% / 0.075)`,
    },
    title: {
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      fontSize: "24px",
      color: colors.contentSideBar[100],
    },
    content: {
      paddingLeft: "30px",
      paddingRight: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      fontSize: "24px",
      color: colors.contentSideBar[100],
    },
    button: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px",
      backgroundColor: "#ccc",
      borderRadius: "5px",
      cursor: "pointer",
    },
  });

  return (
    <Box m="20px">
      <Header title="Queues Center" subtitle="Alpha Version" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
        </Grid>
        <Grid item xs={12} md={2}>
            <AttendantManager />
        </Grid>
        <Grid item xs={12} md={2}>
            <QueueManager />
        </Grid>
        <Grid item xs={12} md={2}>
            <CustomerManager />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Diagram;
