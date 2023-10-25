import { useState } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { 
  useGetCallsActivityQuery,
  useGetChannelsActivityItemQuery
} from "../../../features/stasis/StasisActivity";

const Calls = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchKey, setSearchKey] = useState('');

  const { data: calls, isLoading, isError } = useGetCallsActivityQuery({page, pageSize, search: searchKey});

  console.log('calls', calls)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
    setPage(1); // Reset page to 1 when performing a new search
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
      flex: 0.2,
    }, // Small columns do not need flex 1
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.3,
      cellClassName: "name-column-cell",
    },
    {
      field: "extension",
      headerName: "Extension",
      flex: 0.5,
      cellClassName: "general-column-cell",
    },
    {
      field: "caller_number",
      headerName: "Caller Number",
      flex: 0.6,
      cellClassName: "general-column-cell",
    },
    {
      field: "creation_time",
      headerName: "Started At",
      flex: 0.6,
      cellClassName: "general-column-cell",
    },
    {
      headerName: "Actions",
      flex: 0.3,
      cellClassName: "general-column-cell",
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="10px"
            m="0 auto"
            mb={3}
            p="10px"
            display="flex"
            justifyContent="center"
          > {/* <UserDetailsDialog userId={id} /> */}
            
          </Box>
        );
      },
    },
  ];

  console.log('calls', calls)

  return (
    <Box m="20px">
      <Header title="Calls Reports" subtitle="Beta Version" />

      <Typography variant="h3" color={colors.grey[200]} marginTop="20px">
        Channels
      </Typography>

      <div>
      <div>
        <input type="text" value={searchKey} onChange={handleSearch} placeholder="Search by name" />
      </div>
      <div>
        <button disabled={page === 1} onClick={handlePreviousPage}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      <Box
            m="40px 0 0 0"
            height="75vh"
            sx={table_style}
            className="card-shadow card-dash"
          >
        <DataGrid rows={calls['results']} columns={columns} density="compact" />
      </Box>
    </div>

    </Box>
  );
};

export default Calls;

