import { Typography, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useGetTicketsQuery } from "../../features/tickets/ticketApiSlice";
import { TicketCreateDialog } from "../../components/tickets/crud/TicketCreateDialog";
import { TicketUpdateDialog } from "../../components/tickets/crud/TicketUpdateDialog";

const Ticket = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery();

  if (isSuccess) {
    console.log("tickets:", tickets);
  }

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
      field: "select_profile",
      headerName: "User",
      flex: 0.2,
      cellClassName: "general-column-cell",
    },
    {
      field: "select_category",
      headerName: "Category",
      flex: 0.3,
      cellClassName: "general-column-cell",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
      cellClassName: "name-column-cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.4,
      cellClassName: "name-column-cell",
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
            <TicketUpdateDialog ticketId={id}/>
          </Box>
        );
      },
    },
  ];

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
          <Header title="Tickets" subtitle="Manage Tickets" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={table_style}
            className="card-shadow"
          >
            <DataGrid
              rows={tickets}
              columns={columns}
              density="compact"
            />
          </Box>
        </Box>
        <TicketCreateDialog />
      </Box>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default Ticket;
