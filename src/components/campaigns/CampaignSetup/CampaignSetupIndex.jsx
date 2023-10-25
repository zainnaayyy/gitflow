import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetCampaignsQuery,
  useGetCampaignTemplateQuery,
  useSelectCampaignMutation,
} from "../../../features/campaigns/CampaignsApiSlice";

const CampaignSetupIndex = ({ colors }) => {
  const [selectCampaign] = useSelectCampaignMutation();

  const {
    data: campaigns,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCampaignsQuery();

  const {
    data: template,
    isLoading: templateIsLoading,
    isSuccess: templateIsSuccess,
    isError: templateIsError,
    templateError,
  } = useGetCampaignTemplateQuery();



  if(isSuccess && templateIsSuccess){
    campaigns.map((campaign) => {
      const campaignComplete = template.find((item) => item.link_campaign_name === campaign.id)
      console.log('campaignComplete', campaignComplete)
    })
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-column-cell",
    },
    {
      field: "campaign_template",
      headerName: "Campaign Template",
      flex: 3,
      cellClassName: "general-column-cell",
    },
    {
      field: "conditional",
      headerName: "Conditional",
      flex: 3,
      cellClassName: "general-column-cell",
    },
  ];

  const table_style = {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .name-column-cell": {
      color: colors.headerCard[200],
      fontSize: "16px",
    },
    "& .id-column-cell": {
      color: colors.headerCard[200],
      fontSize: "16px",
    },
    "& .general-column-cell": {
      color: colors.headerCard[200],
      fontSize: "16px",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.headerCard[100],
      borderBottom: "none",
      fontSize: "16px",
      color: colors.headerCard[200],
      fontWeight: "600",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.contentCard[800],
    },

    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.headerCard[100],
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
    },
    "& .MuiTablePagination-selectLabel ": {
      fontWeight: "400",
      color: colors.pagination[100],
    },
    "& .MuiTablePagination-displayedRows": {
      fontWeight: "400",
      color: colors.pagination[100],
    },
    "& .MuiSelect-select  ": {
      fontWeight: "400",
      color: colors.pagination[100],
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[110]} !important`,
    },
    ".MuiFab-circularizeLarge  ": {
      backgroundColor: `${colors.greenAccent[110]} !important`,
    },
  };

  const DisplayCampaign = (campaign, templates) => {
    templates.map((template) => {
      console.log('templatemap', template)
    })
  }

  let content;

  if (isLoading && templateIsLoading) {
    content = "aee";
  } else if (isSuccess && templateIsSuccess) {
    content = (
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} color={colors.grey[200]}>
          <Box
            m="0 0 20px 0"
            backgroundColor={colors.primary[710]}
            className="card-dash card-shadow"
            height={250}
            width={"100%"}
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
                Index
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
                Current
              </Typography>
              <Typography
                variant="h2"
                component="div"
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  mt: 3,
                  color: colors.contentSideBar[500],
                }}
              >
                {campaigns.map((campaign) => {
                  return (
                    <Box>
                      <button onClick={DisplayCampaign(campaign.id, template)}>
                      </button>
                    </Box>
                  );
                })}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <Box
              backgroundColor={colors.primary[710]}
              className="card-dash card-shadow"
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
                  Active Campaigns
                </Typography>
              </Box>

              <Box
                m="40px 0 0 0"
                height="60vh"
                sx={table_style}
                className="card-shadow card-dash"
              >
                <DataGrid rows={template} columns={columns} density="compact" />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }
  return content;
};

export default CampaignSetupIndex;
