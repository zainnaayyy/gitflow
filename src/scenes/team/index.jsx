import { Typography, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";


const Team = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", cellClassName: "id-column-cell" }, // Small columns do not need flex 1
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
      field: "access",
      cellClassName: "general-column-cell",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin" ? colors.greenAccent[90] : colors.redAccent[90]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Team" subtitle="Manage Team Members Screen" />
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
            color: "#ffffff",
            fontWeight: "600",
            borderBottom: "none",
            fontSize: "14px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.contentCard[800],
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
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[110],
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          },
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
