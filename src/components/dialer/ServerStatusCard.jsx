import React from "react";
import { Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAddStasisMutation } from "../../features/stasis/stasisApiSlice";
import { useGetStasisQuery } from "../../features/stasis/stasisApiSlice";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const ServerStatusCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: getStatis, isSuccess } = useGetStasisQuery();
  const [createStasis, { isLoading }] = useAddStasisMutation();

  if (isSuccess) {
    console.log("getStatis:", getStatis);
  }

  const StasisFunc = (e) => {
    e.preventDefault();
    console.log("Stasis Func");
    createStasis();
    console.log("Stasis Func AFTER");
  };

  return (
    <Box
      sx={{ mx: 'auto' }}  // Was MT-3
      backgroundColor={colors.primary[710]}
      className="card-dash card-shadow"
      height={250}
      width={"80%"}
    >
      <Box
        borderBottom={`0.5px solid ${colors.grey[90]}`}
        className="header-card-chart"
      >
        <Typography
          color={colors.grey[200]}
          ml={1}
          mt={1}
          mb={1}
          fontWeight={600}
        >
          Server Status
        </Typography>
      </Box>
      <div className="content-chart-card">
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontSize: "28px",
            fontWeight: "600",
            mt: 3,
            color: colors.contentSideBar[500],
          }}
        >
          Currently
        </Typography>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: "40px",
            fontWeight: "600",
            color: colors.profile[100],
            marginTop: "20px"
          }}
        >
          Active
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontSize: "18px",
            fontWeight: "500",
            color: colors.contentSideBar[700],
          }}
        >
          
        </Typography>
      </div>
    </Box>
  );
};

export default ServerStatusCard;
