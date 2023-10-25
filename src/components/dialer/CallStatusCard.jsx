import React from "react";
import { Box, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAddStasisMutation } from "../../features/stasis/stasisApiSlice";
import { useGetStasisQuery } from "../../features/stasis/stasisApiSlice";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

import { useSelector } from 'react-redux';

const CallStatusCard = () => {
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

  const time = useSelector((state) => state.time.time);

  /* compare
  const startTime = 1683573699609;
  const endTime = 1683572480652;
  const timeDiff = endTime - startTime;
  const hours = Math.floor(timeDiff / (60 * 60 * 1000));
  const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);
  const formattedTimeDiff = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  console.log('formattedTimeDiff', formattedTimeDiff);
  */

  return (
    <Box
      sx={{ mx: 'auto' }}
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
          Call Status
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
          Duration
        </Typography>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: "40px",
            fontWeight: "600",
            color: colors.profile[100],
            marginTop: '20px'
          }}
        >
          {time}
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

export default CallStatusCard;
