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

import { useGetUsersQuery } from "../../features/users/userApiSlice";
import UserImageUpload from "../../components/users/crud/UserImageUpload";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/userApiSlice";


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

  const user_id = useSelector(selectCurrentId)
  const { data: profile, ProfileIsLoading, ProfileIsSuccess } = useGetUserQuery(user_id);
  

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

  let avatarUrl = ''
  if (isSuccess) {
    avatarUrl = `http://localhost:8000/media/image/avatar/${profile['user']['user']}.png?${Date.now()}`;
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
      <Box
        className="header-profile"
        sx={{
          marginTop: "-29px!important",
        }}
      >
        <Box m="20px" className="transparent"></Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            {/* Section img profile */}
            <Box
              className="card-profile"
              backgroundColor={colors.primary[710]}
              sx={{
                marginTop: "-50px!important",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="profile-user"

                  height="100px"
                  src={avatarUrl}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    marginTop: "20px",
                  }}
                />
                <Typography
                  className="font-vz"
                  variant="h3"
                  color={colors.grey[200]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Julio Crevo
                </Typography>
                <Typography
                  className="font-vz"
                  variant="h6"
                  color={colors.contentSideBar[400]}
                  fontWeight="600"
                  marginBottom="20px"
                >
                  Lead Designer / Developer
                </Typography>
              </Box>
            </Box>
            {/* Section progress profile */}
            <Box
              className="card-profile"
              backgroundColor={colors.primary[710]}
              marginTop="30px"
            >
              <Box>
                <div className="ajst-padding">
                  <div className="flex-grow-1">
                    <h3 className="card-title mb-0">Profile Completed</h3>
                  </div>

                  <div className="linear-progress">
                    <CustomLinearProgress
                      variant="determinate"
                      value={ProfileCompleted()}
                    ></CustomLinearProgress>
                    <div className="label">{ProfileCompleted()}%</div>
                  </div>
                </div>
              </Box>
            </Box>
            {/* Section User info */}
            <Box
              className="card-profile"
              backgroundColor={colors.primary[710]}
              marginTop="30px"
            >
              <Box>
                <div className="ajst-padding">
                  <div className="flex-grow-1">
                    <h3 className="card-title mb-0">User info</h3>
                  </div>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="User name"
                        fullWidth
                        autoComplete="fname"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Email"
                        fullWidth
                        autoComplete="fname"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {/* Section Tabs */}
            <Box
              className="card-profile"
              backgroundColor={colors.primary[710]}
              sx={{
                marginTop: "-50px!important",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  marginLeft: "20px!important",
                  height: "100%",
                }}
              >
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Tab 1" />
                  <Tab label="Tab 2" />
                  <Tab label="Tab 3" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <h1>Tab 1 content - <UserImageUpload /></h1>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <h1>Tab 2 content</h1>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <h1>Tab 3 content</h1>
                </TabPanel>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <br />
        <br />
      </Box>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default Profile;
