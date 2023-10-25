import React from "react";
import { Box, Skeleton } from "@mui/material";
import { UserDetailsDialog } from "./crud/UserDetailsDialog";
import { DataGrid } from "@mui/x-data-grid";

const UsersList = ({ colors, users, isLoading, isSuccess }) => {

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
      flex: 0.1,
    }, // Small columns do not need flex 1
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.6,
      cellClassName: "name-column-cell",
    },
    {
      field: "middle_name",
      headerName: "Middle Name",
      flex: 0.6,
      cellClassName: "name-column-cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.6,
      cellClassName: "name-column-cell",
    },
    {
      field: "extension",
      headerName: "Extension",
      flex: 0.5,
      cellClassName: "general-column-cell",
    },
    {
      field: "did",
      headerName: "DID",
      flex: 0.6,
      cellClassName: "general-column-cell",
    },
    {
      field: "phone_number",
      headerName: "Personal Phone",
      flex: 0.6,
      cellClassName: "general-column-cell",
    },
    {
      field: "user_role",
      cellClassName: "general-column-cell",
      headerName: "User Role",
      flex: 0.6,
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
          >
            <UserDetailsDialog userId={id} />
          </Box>
        );
      },
    },
  ];

  let content;

  if (isLoading) {
    content = (
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={table_style}
        className="card-shadow card-dash"
      >
        {/* For variant="text", adjust the height via font-size */}

        <Skeleton
          animation="wave"
          variant="rounded"
          height={40}
          sx={{ bgcolor: colors.dialogCard[100] }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          height={515}
          sx={{ mt: "2px", bgcolor: colors.dialogCard[100] }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          height={54}
          sx={{ mt: "2px", bgcolor: colors.dialogCard[100] }}
        />
      </Box>
    );
  } else if (isSuccess) {
    content = (
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={table_style}
        className="card-shadow card-dash"
      >
        <DataGrid rows={users} columns={columns} density="compact" />
      </Box>
    );
  }

  return content;
};

export default UsersList;
