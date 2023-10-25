import React from 'react';
import { Box, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAddStasisMutation } from '../../features/stasis/stasisApiSlice';
import { useGetStasisQuery } from '../../features/stasis/stasisApiSlice';
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Stasis = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: getStatis, isSuccess } = useGetStasisQuery();
  const [ createStasis, { isLoading } ] = useAddStasisMutation();

  if(isSuccess) {
    console.log('getStatis:', getStatis)
  }

  const StasisFunc = (e) => {
    e.preventDefault();
    console.log('Stasis Func');
    createStasis();
    console.log('Stasis Func AFTER');
  }

  return (
    <Box
    sx={{ mx: 'auto', mt: 10}}
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
        Active
      </Typography>
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontSize: "68px",
          fontWeight: "600",
          color: colors.greenAccent[500],
        }}
      >
        10
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
        Last Call 22/03/2023
      </Typography>
    </div>
  </Box>
  )
}

export default Stasis;

{/*

    <Box display="flex" flexWrap="wrap" sx={{ mt: 1 }}>
        <Box>
          <Card
            sx={{
              maxWidth: 300,
              backgroundColor: `${colors.primary[450]} !important`,
              ml: 5,
              width: 300,
              mt: 2,

            }}
          >
            <CardMedia sx={{ mt: 2 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={`../../assets/image.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                  marginTop: "16px",
                }}
              >
                Asterisk
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#71FF33",
                    textAlign: "center",
                  }}
                >
                  </Typography>
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    Matrix
    
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <form onSubmit={StasisFunc}>
                    <Button 
                      type="submit" 
                      size="small"
                      sx={{
                        backgroundColor: "#0e8e5f",
                        width: "100%",
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#ffffff",
                        mb: 2,
                      }}
                      className="btn-connect"
                    >
                      Create Statis
                    </Button>
                  </form>
                </CardActions>
              </Card>
            </Box>
      </Box>

*/}