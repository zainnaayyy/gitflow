import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  useTheme,
  Grid,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { tokens } from "../../theme";
import { LinearProgress } from "@mui/material";

import Header from "../../components/Header";
import { useGetUsersQuery } from "../../features/users/userApiSlice";
import UserImageUpload from "../../components/users/crud/UserImageUpload";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import StatBox from "../../components/dashboard/StatBox";

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

const CustomLinearProgress = withStyles((theme) => ({
  root: {
    borderRadius: 10,
    height: 10,
  },
  bar: {
    borderRadius: 10,
    height: 10,
  },
  barColorPrimary: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress);

const Profile = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState(0);

  const user_id = useSelector(selectCurrentId);
  const {
    data: profile,
    ProfileIsLoading,
    ProfileIsSuccess,
  } = useGetUserQuery(user_id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const ProfileCompleted = () => 20;

  let avatarUrl = "";
  if (isSuccess) {
    avatarUrl = `https://back.iqbot.live/media/image/avatar/${profile["user"]["user"]}.png?${Date.now()}`;
  }

  let content;

  if (isLoading) {
    content = (
      <Box m="20px">
        <h1>Fetching Backend ...</h1>
      </Box>
    );
  } else if (isSuccess) {
    content = (
      <Box>
        <Box
          className="header-profile"
          sx={{
            marginTop: "-29px!important",
          }}
        ></Box>

        <Box m="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: "-260px!important" }}
          >
            <Header title="Profile" subtitle="Reemagine Panel" />
          </Box>

          <Grid container spacing={2}>
            {/* Chart 1 */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                className="card-dash card-shadow"
                gridColumn="span 3"
                backgroundColor={colors.primary[710]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
              <Box mb="25px">
                <Box sx={{ display: "flex", justifyContent: "center", pt: 3 }}>
                  <Box
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // ml: "30%",  // FIX IT, ITS a GAMBIARRA, NEED TO FIX THE IMAGE IN THE CENTRE
                    }}
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      src={avatarUrl}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
                {/* src={`../../assets/user.png`} */}
                <Box textAlign="center">
                  <Typography
                    className="font-vz"
                    variant="h2"
                    color={colors.contentSideBar[100]}
                    fontWeight="bold"
                    sx={{ m: "5px 0 0 0" }}
                  >
                    {profile["user"]["user"]}
                  </Typography>
                  <Typography
                    className="font-vz"
                    variant="h5"
                    color={colors.profile[100]}
                    fontWeight="600"
                  >
                    {profile["user"]["user_role"]}
                  </Typography>
                </Box>
              </Box>
              </Box>
            </Grid>{" "}
            {/* Chart 2 */}
            <Grid item xs={12} sm={6} md={9}>
              <Box
                className="card-dash card-shadow"
                gridColumn="span 3"
                backgroundColor={colors.primary[710]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="192px"
              >
                <UserImageUpload />
              </Box>
            </Grid>{" "}
          </Grid>

        </Box>
      </Box>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default Profile;
