import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import Header from "../../components/Header";
import { useGetCustomersQuery } from "../../features/users/customerApiSlice";

const Customers = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: customers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCustomersQuery();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-column-cell",
    },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.7,
      cellClassName: "general-column-cell",
    },
    {
      field: "middle_name",
      headerName: "Middle Name",
      flex: 0.7,
      cellClassName: "name-column-cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.7,
      cellClassName: "general-column-cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAling: "left",
      align: "center",
      flex: 0.4,
      cellClassName: "general-column-cell",
    },
    {
      field: "phone_number_type",
      headerName: "Phone Type",
      flex: 0.7,
      cellClassName: "general-column-cell",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "plan",
      headerName: "Plan",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "enroll_date",
      headerName: "Enroll Date",
      flex: 1,
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
          <Header title="Customers" subtitle="Manage Customers" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={table_style}
            className="card-shadow"
          >
            <DataGrid
              rows={customers}
              columns={columns}
              density="compact"
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

export default Customers;
