import { useState } from "react";
import { Typography, Box, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useGetCallLogQuery } from "../../../features/logs/logsApiSlice";
import SearchIcon from "@mui/icons-material/Search";

const ChannelsLogs = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [filterModel, setFilterModel] = useState({ items: [] });
  const [columnDefined, setcolumnDefined] = useState()
  const [columnDefinedName, setcolumnDefinedName] = useState("Search")

  const {
    data: logs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCallLogQuery();

  const doSearch = (params) => {
    setcolumnDefined(params['field'])
    setcolumnDefinedName(params['colDef']['headerName'])
  }

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const newFilterModel = {
      items: [
        { columnField: columnDefined, operatorValue: "contains", value },
      ],
    };
    setFilterModel(newFilterModel);
  };

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
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      cellClassName: "id-column-cell",
      flex: 0.3,
    }, // Small columns do not need flex 1
    {
      field: "src",
      headerName: "Source",
      flex: 0.6,
      cellClassName: "name-column-cell",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: "5px" }}>
            <SearchIcon onClick={() => doSearch(params)} style={{ fontSize: "18px", marginRight: "10px" }} />
          </div>
          <span>{params['colDef']['headerName']}</span>
        </div>
      ),
    },
    {
      field: "dst",
      headerName: "Destination",
      flex: 0.6,
      cellClassName: "name-column-cell",
      disableColumnMenu: true, // Disable the 3 dots with filtering
      renderHeader: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginLeft: "5px" }}>
            <SearchIcon onClick={() => doSearch(params)} style={{ fontSize: "18px", marginRight: "10px" }} />
          </div>
          <span>{params['colDef']['headerName']}</span>
        </div>
      ),
    },
    {
      field: "uniqueid",
      headerName: "Channel ID",
      flex: 0.6,
      cellClassName: "name-column-cell",
      disableColumnMenu: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 0.5,
      cellClassName: "general-column-cell",
      disableColumnMenu: true,
    },
    {
      field: "start",
      headerName: "Start Time",
      flex: 1,
      cellClassName: "general-column-cell",
    },
  ];

  console.log('filterModel:', filterModel)

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
        <Box m="20px">
          <Header title="Logs" subtitle="Display Logs" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={table_style}
            className="card-shadow"
          >
            <div style={{ width: '400px' }}>
            <TextField
              label={columnDefinedName}
              variant="outlined"
              onChange={handleFilterChange}
              size="large"
            />
            </div>
            <DataGrid
              rows={logs}
              columns={columns}
              density="compact"
              filterModel={filterModel}
              onFilterModelChange={setFilterModel}
              classes={{
                header: "custom-header",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default ChannelsLogs;
