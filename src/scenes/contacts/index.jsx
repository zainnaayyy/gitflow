import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      cellClassName: "id-column-cell",
    },
    {
      field: "registrarId",
      headerName: "Registrar ID",
      cellClassName: "general-column-cell",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAling: "left",
      align: "left",
      cellClassName: "general-column-cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      cellClassName: "general-column-cell",
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
      cellClassName: "general-column-cell",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Contacts" subtitle="Manage Contacts" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[110],
            fontSize: "14px",
          },
          "& .id-column-cell": {
            color: colors.blueAccent[110],
            fontSize: "14px",
          },
          "& .general-column-cell": {
            color: colors.blueAccent[210],
            fontSize: "14px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.grey[110],
            borderBottom: "none",
            fontSize: "14px",
            className: "card-shadow",
            color: "#ffffff",
            fontWeight: "600",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.contentCard[800],
            className: "card-shadow",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[110],
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            className: "card-shadow",
          },
          "& .MuiTablePagination-selectLabel ": {
            fontWeight: "700",
          },
          "& .MuiTablePagination-displayedRows": {
            fontWeight: "700",
          },
          "& .MuiSelect-select  ": {
            fontWeight: "700",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
