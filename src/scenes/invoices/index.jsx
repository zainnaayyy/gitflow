import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = ({ title, subtitle }) => {
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
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      cellClassName: "general-column-cell",

      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "general-column-cell",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Invoices" subtitle="List of Invoice Balances" />
      <Box
        className="card-shadow"
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
            color: "#ffffff",
            fontWeight: "600",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.contentCard[800],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[110],
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[110]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataInvoices} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Invoices;
